# Gemini 3 Migration Guide

## Changes Effective: January 30, 2026

Google is upgrading the underlying models to Gemini 3, which introduces advanced reasoning capabilities with "Thought Signatures."

## What Changed in LinkSnap

### ✅ Completed Updates

1. **Default Model Updated**
   - Changed from `gemini-2.5-flash` to `gemini-3-flash-preview`
   - Auto-redirect happens Jan 30, 2026

2. **Model List Reorganized**
   - Gemini 3 models moved to top priority
   - Added `gemini-3-pro-preview` option
   - Removed deprecated lite models

3. **Thought Signature Support Added**
   - Added `thoughtSignature` field to AnalysisRequest interface
   - Backend now captures and returns thought signatures
   - Ready for future function calling features

### 🔄 Model Alias Changes (Jan 30, 2026)

| Old Alias | New Model |
|-----------|-----------|
| `gemini-pro-latest` | `gemini-3-pro-preview` |
| `gemini-flash-latest` | `gemini-3-flash-preview` |

**Note:** LinkSnap doesn't use `-latest` aliases, so no breaking changes.

## What Are Thought Signatures?

Gemini 3 generates internal reasoning chains. When using function calling:

- **Old Way:** Model remembered context automatically
- **New Way:** Must capture and pass back `thoughtSignature` to maintain reasoning chain

### Example (Future Reference)

```typescript
// When you add function calling in the future:

// 1. Call model with tools
const response = await geminiModel.generateContent(prompt, { tools: [myTool] });

// 2. Capture the thought signature
const thoughtSig = response.candidates?.[0]?.thoughtSignature;

// 3. Execute your function
const functionResult = await myFunction();

// 4. Pass signature back in next call
const nextResponse = await geminiModel.generateContent(
  [functionResult],
  { thoughtSignature: thoughtSig } // Keeps reasoning chain alive
);
```

## Current Status

✅ **No Action Required for Basic Usage**
- LinkSnap doesn't use function calling yet
- Thought signature infrastructure is in place
- Will automatically use Gemini 3 on Jan 30

⚠️ **If You Add Function Calling Later**
- Use the captured `thoughtSignature` from responses
- Pass it back in subsequent calls
- See example above

## Testing

You can test early by explicitly using:
- `gemini-3-flash-preview` (free tier)
- `gemini-3-pro-preview` (paid tier)

Already set as defaults in:
- [services/geminiService.ts](services/geminiService.ts#L21)
- [api/analyze.ts](api/analyze.ts#L40)

## Resources

- [Google AI Blog: Gemini 3 Launch](https://ai.google.dev)
- [Thought Signatures Documentation](https://ai.google.dev/docs/function-calling)
- Email: January 22, 2026 notification

---

*Last Updated: January 22, 2026*
