# `seriesOrder`

| | |
| --- | --- |
| Type | positive integer or `null` |
| Required | no |
| Default | `null` |

The position of the post inside its series.

```yaml
seriesOrder: 2
```

The schema is `z.number().int().positive().nullable()`, so `0`, negatives and decimals are rejected. In the series box, a post without an order shows `?`. The validator also errors when the value is not numeric.
