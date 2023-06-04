import { makeTriggerable } from "../triggerable";
import { makeRepo } from "./repo";
import { StorageArea, WebextStorageService } from "./types";
import { deepEqual } from "fast-equals";
import { z } from "zod";

// TODO balance validations, val => map => val is excessive
export function makeService<
    zJson extends z.SomeZodObject,
    zParsed extends z.SomeZodObject
>(
    dtoSchema: zJson,
    toDomain: (json: z.infer<zJson>) => z.infer<zParsed>,
    domainSchema: zParsed,
    toDto: (parsed: z.infer<zParsed>) => z.infer<zJson>,
    storage: StorageArea = "sync"
): WebextStorageService<z.infer<zJson>, z.infer<zParsed>> {
    type TT = z.infer<zJson>;

    const repo = makeRepo<TT>(Object.keys(dtoSchema.shape), storage);

    async function validate(): Promise<boolean> {
        const json = await repo.read();
        const parseDto = dtoSchema.safeParse(json);
        return parseDto.success && deepEqual(json, parseDto.data);
    }

    async function load(): Promise<TT> {
        const json = await repo.read();
        // TODO errors need to produce defaults
        const dto = dtoSchema.parse(json);
        return toDomain(dto);
    }

    async function save(data: Partial<TT>): Promise<void> {
        const valid = domainSchema.partial().parse(data);
        await repo.write(valid);
    }

    const triggerable = makeTriggerable<TT>();
    repo.monitor((data) => {
        const dto = dtoSchema.parse(data);
        const parsed = toDomain(dto);
        triggerable.hide.trigger(parsed);
    });
    const changes = triggerable.expose;

    return { changes, load, save, validate };
}
