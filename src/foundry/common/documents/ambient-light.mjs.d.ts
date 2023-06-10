// FOUNDRY_VERSION: 10.291

import type Document from "../abstract/document.mjs";
import type { DocumentMetadata } from "../abstract/document.mjs";
import type { LightData } from "../data/data.mjs/index.js";
import type * as fields from "../data/fields.mjs";

declare global {
  type AmbientLightData = BaseAmbientLight.Properties;
}

/**
 * The Document definition for an AmbientLight.
 * Defines the DataSchema and common behaviors for an AmbientLight which are shared between both client and server.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseAmbientLight extends BaseAmbientLight.Properties {}
declare class BaseAmbientLight extends Document<BaseAmbientLight.SchemaField, BaseAmbientLight.Metadata> {
  /**
   * @param data    - Initial data from which to construct the AmbientLight
   * @param context - Construction context options
   */
  constructor(data: BaseAmbientLight.ConstructorData, context?: DocumentConstructionContext);

  static override metadata: Readonly<BaseAmbientLight.Metadata>;

  static override defineSchema(): BaseAmbientLight.Schema;

  static override migrateData(source: object): object;
}
export default BaseAmbientLight;

declare namespace BaseAmbientLight {
  type Metadata = Merge<
    DocumentMetadata,
    {
      name: "AmbientLight";
      collection: "lights";
      label: "DOCUMENT.AmbientLight";
      labelPlural: "DOCUMENT.AmbientLights";
    }
  >;

  type SchemaField = fields.SchemaField<Schema>;
  type ConstructorData = UpdateData;
  type UpdateData = fields.SchemaField.InnerAssignmentType<Schema>;
  type Properties = fields.SchemaField.InnerInitializedType<Schema>;
  type Source = fields.SchemaField.InnerPersistedType<Schema>;

  interface Schema extends DataSchema {
    /**
     * The _id which uniquely identifies this BaseAmbientLight embedded document
     * @defaultValue `null`
     */
    _id: fields.DocumentIdField;

    /**
     * The x-coordinate position of the origin of the light
     * @defaultValue `0`
     */
    x: fields.NumberField<{ required: true; integer: true; nullable: false; initial: 0; label: "XCoord" }>;

    /**
     * The y-coordinate position of the origin of the light
     * @defaultValue `0`
     */
    y: fields.NumberField<{ required: true; integer: true; nullable: false; initial: 0; label: "YCoord" }>;

    /**
     * The angle of rotation for the tile between 0 and 360
     * @defaultValue `0`
     */
    rotation: fields.AngleField<{ label: "LIGHT.Rotation" }>;

    /**
     * Whether or not this light source is constrained by Walls
     * @defaultValue `true`
     */
    walls: fields.BooleanField<{ initial: true; label: "LIGHT.Walls"; hint: "LIGHT.WallsHint" }>;

    /**
     * Whether or not this light source provides a source of vision
     * @defaultValue `false`
     */
    vision: fields.BooleanField<{ label: "LIGHT.Vision"; hint: "LIGHT.VisionHint" }>;

    /**
     * Light configuration data
     * @defaultValue see {@link LightData}
     */
    config: fields.EmbeddedDataField<LightData>;

    /**
     * Is the light source currently hidden?
     * @defaultValue `false`
     */
    hidden: fields.BooleanField<{ label: "Hidden" }>;

    /**
     * An object of optional key/value flags
     * @defaultValue `{}`
     */
    flags: fields.ObjectField.FlagsField<"AmbientLight">;
  }
}