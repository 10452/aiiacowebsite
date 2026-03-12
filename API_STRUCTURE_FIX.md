# Key Finding: language_presets Location

From the ElevenLabs Update Agent API reference (line 177-201 of the response example):

**language_presets is at `conversation_config` level, NOT inside `conversation_config.agent`**

The correct structure:
```json
{
  "conversation_config": {
    "language_presets": {
      "ar": {
        "overrides": {
          "tts": {
            "voice_id": "8KMBeKnOSHXjLqGuWsAE"
          },
          "agent": {
            "first_message": "...",
            "language": "ar"
          }
        }
      }
    },
    "agent": {
      "language": "en",
      "tools": [...]
    }
  }
}
```

Previous WRONG structure had language_presets nested inside conversation_config.agent.
That's why the API returned 200 but silently ignored the field.

Also need to check: tools structure - the API reference shows tools under agent.prompt.tool_ids, not agent.tools.
And system tools like language_detection may need a different structure.
