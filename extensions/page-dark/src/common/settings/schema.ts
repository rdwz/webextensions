import { z } from "zod";

export const settingsSchema = z.object({
    enableDarkeningFromContextMenu: z.boolean().default(true),
});

export type Settings = z.infer<typeof settingsSchema>;
