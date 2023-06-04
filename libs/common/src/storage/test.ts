import { makeService } from "./service";
import { z } from "zod";

const dtoSchema = z.object({ foo: z.string().datetime() });
type Dto = z.infer<typeof dtoSchema>;

const domainSchema = z.object({ foo: z.date() });
type Settings = z.infer<typeof domainSchema>;

function toDto(settings: Settings): Dto {
    return { foo: settings.foo.toISOString() };
}

function toDomain(dto: Dto): Settings {
    return { foo: new Date(dto.foo) };
}

const service = makeService(dtoSchema, toDomain, domainSchema, toDto);

const dto = await service.load();
void dto.foo;
await service.save({ foo: "abc" });
await service.validate();
service.changes.subscribe(console.info, "stdout");
