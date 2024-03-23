export type Json = JsonPrimitive | JsonArray | JsonObject;

export type JsonPrimitive = number | string | null | boolean;
export type JsonArray = Json[];
export type JsonObject = {[P in string | number]?: Json};
