/**
 * https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#glb-file-format-specification
 */

/**
 * ### 5.1.6. accessor.type
 * Specifies if the accessor’s elements are scalars, vectors, or matrices.
 * 
 * ### 5.1.7. accessor.max
 * Maximum value of each component in this accessor. 
 * Array elements MUST be treated as having the same data type as accessor’s componentType. 
 * Both min and max arrays have the same length. The length is determined by the value of the type property; it can be 1, 2, 3, 4, 9, or 16.
 * `normalized` property has no effect on array values: they always correspond to the actual values stored in the buffer.
 * When the accessor is sparse, this property MUST contain maximum values of accessor data with sparse substitution applied.
 * 
 * ### 5.1.8. accessor.min
 * Minimum value of each component in this accessor. 
 * Array elements MUST be treated as having the same data type as accessor’s componentType. 
 * Both min and max arrays have the same length. The length is determined by the value of the type property; it can be 1, 2, 3, 4, 9, or 16.
 * `normalized` property has no effect on array values: they always correspond to the actual values stored in the buffer. When the accessor is sparse, 
 * this property MUST contain minimum values of accessor data with sparse substitution applied.
 */
type TAccessorType = {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'SCALAR';
    /** Minimum value of each component in this accessor. */
    min?: [number];
    /** Maximum value of each component in this accessor. */
    max?: [number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'VEC2';
    /** Minimum value of each component in this accessor. */
    min?: [number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'VEC3';
    /** Minimum value of each component in this accessor. */
    min?: [number, number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number, number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'VEC4';
    /** Minimum value of each component in this accessor. */
    min?: [number, number, number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number, number, number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'MAT2';
    /** Minimum value of each component in this accessor. */
    min?: [number, number, number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number, number, number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'MAT3';
    /** Minimum value of each component in this accessor. */
    min?: [number, number, number, number, number, number, number, number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number, number, number, number, number, number, number, number];
} | {
    /** Specifies if the accessor’s elements are scalars, vectors, or matrices. */
    type: 'MAT4';
    /** Minimum value of each component in this accessor. */
    min?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /** Maximum value of each component in this accessor. */
    max?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
}

type TExt = {
    /** JSON object with extension-specific objects. */
    extensions?: TExtension;
    /** Application-specific data. */
    extras?: TExtras;
}

type TNamedExt = TExt & {
    /**
     * The user-defined name of this object. 
     * This is not necessarily unique, e.g., an accessor and a buffer could have the same name, 
     * or two accessors could even have the same name.
     */
    name?: string;
}

/**
 * ### 5.1. Accessor
 * A typed view into a buffer view that contains raw binary data.
 */
export type TAccessor = TExt & TAccessorType & {
    /** 
     * ### 5.1.1. accessor.bufferView
     * The index of the buffer view. 
     * When undefined, the accessor MUST be initialized with zeros; sparse property or extensions MAY override zeros with actual values.
     * - Minimum: >= 0
     * */
    bufferView?: number;
    /**
     * ### 5.1.2. accessor.byteOffset
     * The offset relative to the start of the buffer view in bytes. This MUST be a multiple of the size of the component datatype. This property MUST NOT be defined when bufferView is undefined.
     * - Minimum: >= 0
     * - Related WebGL functions: vertexAttribPointer() offset parameter
     * */
    byteOffset?: number;
    /**
     * ### 5.1.3. accessor.componentType
     * The datatype of the accessor’s components. 
     * UNSIGNED_INT type MUST NOT be used for any accessor that is not referenced by mesh.primitive.indices.
     * The datatype.
     * - 5120 `BYTE` -> `Int8Array`
     * - 5121 `UNSIGNED_BYTE` -> `Uint8Array`
     * - 5122 `SHORT` -> `Int16Array`
     * - 5123 `UNSIGNED_SHORT` -> `Uint16Array`
     * - 5125 `UNSIGNED_INT` -> `Uint32Array`
     * - 5126 `FLOAT` -> `Float32Array`
     * */
    componentType: 5120 | 5121 | 5122 | 5123 | 5125 | 5126;
    /**
     * ### 5.1.4. accessor.normalized
     * Specifies whether integer data values are normalized (true) to [0, 1] (for unsigned types) 
     * or to [-1, 1] (for signed types) when they are accessed. 
     * This property MUST NOT be set to true for accessors with FLOAT or UNSIGNED_INT component type.
     * - default: false.
     * - Related WebGL functions: `normalized` parameter of `vertexAttribPointer()`
     * */
    normalized?: boolean;
    /**
     * ### 5.1.5. accessor.count
     * The number of elements referenced by this accessor, not to be confused with the number of bytes or number of components.
     * - Minimum: >= 1
     * */
    count: number;
    /**
     * ### 5.1.9. accessor.sparse
     * Sparse storage of elements that deviate from their initialization value.
     */
    sparse?: TAccessorSparse;
    /** 
     * ### 5.1.10. accessor.name
     * The user-defined name of this object. 
     * */
    name?: string;
}

/**
 * ### 5.2. Accessor Sparse
 * Sparse storage of accessor values that deviate from their initialization value.
 */
export type TAccessorSparse = TExt & {
    /**
     * ### 5.2.1. accessor.sparse.count
     * Number of deviating accessor values stored in the sparse array.
     * - Minimum: >= 1
     * */
    count: number;
    /**
     * ### 5.2.2. accessor.sparse.indices
     * An object pointing to a buffer view containing the indices of deviating accessor values.
     * The number of indices is equal to `count`. Indices MUST strictly increase.
     * */
    indices: TAccessorSparseIndices;
    /**
     * ### 5.2.3. accessor.sparse.values
     * An object pointing to a buffer view containing the deviating accessor values.
     */
    values: TAccessorSparseValues;
};

/**
 * ### 5.3. Accessor Sparse Indices
 * An object pointing to a buffer view containing the indices of deviating accessor values. 
 * The number of indices is equal to accessor.sparse.count. Indices MUST strictly increase.
 */
export type TAccessorSparseIndices = TExt & {
    /**
     * ### 5.3.1. accessor.sparse.indices.bufferView
     * The index of the buffer view with sparse indices. 
     * The referenced buffer view MUST NOT have its target or byteStride properties defined. 
     * The buffer view and the optional byteOffset MUST be aligned to the componentType byte length.
     * Minimum: >= 0
     */
    bufferView: number;
    /**
     * ### 5.3.2. accessor.sparse.indices.byteOffset
     * The offset relative to the start of the buffer view in bytes.
     * default: 0.
     * Minimum: >= 0
     * */
    byteOffset?: number;
    /** 
     * ### 5.3.3. accessor.sparse.indices.componentType
     * The indices data type. 
     * - 5121 `UNSIGNED_BYTE` -> `Uint8Array`
     * - 5123 `UNSIGNED_SHORT` -> `Uint16Array`
     * - 5125 `UNSIGNED_INT` -> `Uint32Array`
     * */
    componentType: 5121 | 5123 | 5125;
}

/**
 * ### 5.4. Accessor Sparse Values
 * An object pointing to a buffer view containing the deviating accessor values. 
 * The number of elements is equal to accessor.sparse.count times number of components. 
 * The elements have the same component type as the base accessor. 
 * The elements are tightly packed. 
 * Data MUST be aligned following the same rules as the base accessor.
 */
export type TAccessorSparseValues = TExt & {
    /**
     * ### 5.4.1. accessor.sparse.values.bufferView
     * The index of the bufferView with sparse values. 
     * The referenced buffer view MUST NOT have its target or byteStride properties defined.
     * - Minimum: >= 0
     */
    bufferView: number;
    /**
     * ### 5.4.2. accessor.sparse.values.byteOffset
     * The offset relative to the start of the bufferView in bytes.
     * - default: 0
     * - Minimum: >= 0
     * */
    byteOffset?: number;
};

/**
 * ### 5.5. Animation
 * A keyframe animation.
 */
export type TAnimation = TExt & {
    /**
     * ### 5.5.1. animation.channels
     * An array of animation channels. 
     * An animation channel combines an animation sampler with a target property being animated. 
     * Different channels of the same animation MUST NOT have the same targets.
     */
    channels: TAnimationChannel[];
    /**
     * ### 5.5.2. animation.samplers
     * An array of animation samplers. 
     * An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
     */
    samplers: TAnimationSampler[];
    /** 
     * ### 5.5.3. animation.name
     * The user-defined name of this object. 
     * */
    name?: string;
}

/**
 * ### 5.6. Animation Channel
 * An array of animation channels. 
 * An animation channel combines an animation sampler with a target property being animated. 
 * Different channels of the same animation MUST NOT have the same targets.
 */
export type TAnimationChannel = TExt & {
    /** 
     * ### 5.6.1. animation.channel.sampler
     * The index of a sampler in this animation used to compute the value for the target. 
     * */
    sampler: number;
    /** 
     * ### 5.6.2. animation.channel.target
     * The descriptor of the animated property. 
     * */
    target: TAnimationChannelTarget;
}

/** 
 * ### 5.7. Animation Channel Target
 * The descriptor of the animated property. 
 * */
export type TAnimationChannelTarget = TExt & {
    /**
     * ### 5.7.1. animation.channel.target.node
     * The index of the node to animate. When undefined, the animated object MAY be defined by an extension.
     * - Minimum: >= 0
     */
    node: number;
    /**
     * ### 5.7.2. animation.channel.target.path
     * The name of the node’s TRS property to animate, or the "weights" of the Morph Targets it instantiates. 
     * For the "translation" property, the values that are provided by the sampler are the translation along the X, Y, and Z axes. 
     * For the "rotation" property, the values are a quaternion in the order (x, y, z, w), where w is the scalar. 
     * For the "scale" property, the values are the scaling factors along the X, Y, and Z axes.
     */
    path: 'translation' | 'rotation' | 'scale' | 'weights';
}

/**
 * ### 5.8. Animation Sampler
 * An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
 */
export type TAnimationSampler = TExt & {
    /**
     * ### 5.8.1. animation.sampler.input
     * The index of an accessor containing keyframe timestamps.
     * - Minimum: >= 0
     * */
    input: number;
    /**
     * ### 5.8.2. animation.sampler.interpolation.
     * - `LINEAR` The animated values are linearly interpolated between keyframes. When targeting a rotation, spherical linear interpolation (slerp) SHOULD be used to interpolate quaternions. The number of output elements MUST equal the number of input elements.
     * - `STEP` The animated values remain constant to the output of the first keyframe, until the next keyframe. The number of output elements MUST equal the number of input elements.
     * - `CUBICSPLINE` The animation’s interpolation is computed using a cubic spline with specified tangents. The number of output elements MUST equal three times the number of input elements. For each input element, the output stores three elements, an in-tangent, a spline vertex, and an out-tangent. There MUST be at least two keyframes when using this interpolation.
     * */
    interpolation?: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
    /**
     * ### 5.8.3. animation.sampler.output
     * The index of an accessor, containing keyframe output values.
     * - Minimum: >= 0
     * */
    output: number;

}

/**
 * ### 5.9. Asset
 * Metadata about the glTF asset.
 */
export type TAsset = TExt & {
    /**
     * ### 5.9.1. asset.copyright
     * A copyright message suitable for display to credit the content creator.
     */
    copyright?: string;
    /**
     * ### 5.9.2. asset.generator
     * Tool that generated this glTF model. Useful for debugging.
     */
    generator?: string;
    /**
     * ### 5.9.3. asset.version
     * The glTF version in the form of <major>.<minor> that this asset targets.
     * Pattern: `^[0-9]+\.[0-9]+$`
     */
    version: string;
    /**
     * ### 5.9.4. asset.minVersion
     * The minimum glTF version in the form of <major>.<minor> that this asset targets. 
     * This property MUST NOT be greater than the asset version.
     */
    minVersion?: string;
}

/**
 * ### 5.10. Buffer
 * A buffer points to binary geometry, animation, or skins.
 */
export type TBuffer = TExt & {
    /**
     * ### 5.10.1. buffer.uri
     * The URI (or IRI) of the buffer. Relative paths are relative to the current glTF asset. Instead of referencing an external file, this field MAY contain a data:-URI.
     * */
    uri?: string;
    /**
     * ### 5.10.2. buffer.byteLength
     * The length of the buffer in bytes.
     */
    byteLength: number;
    /**
     * ### 5.10.3. buffer.name
     * The user-defined name of this object.
     * This is not necessarily unique, e.g., an accessor and a buffer could have the same name,
     * or two accessors could even have the same name.
     */
    name?: string;
}

/**
 * ### 5.11. Buffer View
 * A view into a buffer generally representing a subset of the buffer.
 */
export type TBufferView = TExt & {
    /**
     * ### 5.11.1. bufferView.buffer
     * The index of the buffer.
     */
    buffer: number;
    /**
     * ### 5.11.2. bufferView.byteOffset
     * The offset into the buffer in bytes.
     */
    byteOffset?: number;
    /**
     * ### 5.11.3. bufferView.byteLength
     * The length of the bufferView in bytes.
     */
    byteLength: number;
    /**
     * ### 5.11.4. bufferView.byteStride
     * The stride, in bytes, between vertex attributes.
     * When this is not defined, data is tightly packed.
     * When two or more accessors use the same buffer view, this field MUST be defined.
     * Type: integer
     * - Required: No
     * - Minimum: >= 4
     * - Maximum: <= 252
     * - Related WebGL functions: `vertexAttribPointer()` stride parameter
     */
    byteStride?: number;
    /**
     * ### 5.11.5. bufferView.target
     * The hint representing the intended GPU buffer type to use with this buffer view.
     * - `34962` `ARRAY_BUFFER`
     * - `34963` `ELEMENT_ARRAY_BUFFER`
     * Related WebGL functions: `bindBuffer()`
     */
    target?: 34962 | 34963;
    /**
     * ### 5.11.6. bufferView.name
     * The user-defined name of this object. This is not necessarily unique, e.g., an accessor and a buffer could have the same name, or two accessors could even have the same name.
     */
    name?: string;
}

/**
 * ### 5.12. Camera
 * A camera’s projection. A node MAY reference a camera to apply a transform to place the camera in the scene.
 */
export type TCamera = TExt & {
    /**
     * ### 5.13. Camera Orthographic
     * An orthographic camera containing properties to create an orthographic projection matrix.
     */
    orthographic?: TCameraOrthographic;
    /**
     * ### 5.14. Camera Perspective
     * A perspective camera containing properties to create a perspective projection matrix.
     */
    perspective?: TCameraPerspective;
    type: string;
    name?: string;
}

/**
 * ### 5.13. Camera Orthographic
 * An orthographic camera containing properties to create an orthographic projection matrix.
 */
export type TCameraOrthographic = TExt & {
    /**
     * ### 5.13.1. camera.orthographic.xmag
     * The floating-point horizontal magnification of the view. This value MUST NOT be equal to zero. This value SHOULD NOT be negative.
     */
    xmag: number;
    /**
     * ### 5.13.2. camera.orthographic.ymag
     * The floating-point vertical magnification of the view. This value MUST NOT be equal to zero. This value SHOULD NOT be negative.
     */
    ymag: number;
    /**
     * ### 5.13.3. camera.orthographic.zfar
     * The floating-point distance to the far clipping plane. This value MUST NOT be equal to zero. zfar MUST be greater than znear.
     */
    zfar: number;
    /**
     * ### 5.13.4. camera.orthographic.znear
     * The floating-point distance to the near clipping plane.
     */
    znear: number;
};

/**
 * ### 5.14. Camera Perspective
 * A perspective camera containing properties to create a perspective projection matrix.
 */
export type TCameraPerspective = TExt & {
    /**
     * ### 5.14.1. camera.perspective.aspectRatio
     * The floating-point aspect ratio of the field of view. When undefined, the aspect ratio of the rendering viewport MUST be used.
     * - Minimum: > 0
     */
    aspectRatio?: number;
    /**
     * ### 5.14.2. camera.perspective.yfov
     * The floating-point vertical field of view in radians. This value SHOULD be less than π.
     * - Minimum: > 0
     */
    yfov: number;
    /**
     * ### 5.14.3. camera.perspective.zfar
     * The floating-point distance to the far clipping plane. 
     * When defined, zfar MUST be greater than znear. 
     * If zfar is undefined, client implementations SHOULD use infinite projection matrix.
     * - Minimum: > 0
     */
    zfar?: number;
    /**
     * ### 5.14.4. camera.perspective.znear
     * The floating-point distance to the near clipping plane.
     * - Minimum: > 0
     */
    znear: number;
};

/**
 * ### 5.15. Extension
 * JSON object with extension-specific objects.
 * Additional properties are allowed.
 * - JSON schema: (extension.schema.json)[https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#schema-reference-extension]
 */
export type TExtension = any;

/**
 * ### 5.16. Extras
 * Application-specific data.
 * Although extras MAY have any type, it is common for applications to store and access custom data as key/value pairs. 
 * Therefore, extras SHOULD be a JSON object rather than a primitive value for best portability.
 */
export type TExtras = any;

/**
 * ### 5.17. glTF
 * The root object for a glTF asset.
 */
export type TGLTF = TExt & {
    /**
     * ### 5.17.1. glTF.extensionsUsed
     * Names of glTF extensions used in this asset.
     * - Each element in the array MUST be unique.
     */
    extensionsUsed?: string[];
    /**
     * ### 5.17.2. glTF.extensionsRequired
     * Names of glTF extensions required to properly load this asset.
     * - Each element in the array MUST be unique.
     */
    extensionsRequired?: string[];
    /**
     * ### 5.17.3. glTF.accessors
     * An array of accessors. An accessor is a typed view into a bufferView.
     */
    accessors?: TAccessor[];
    /**
     * ### 5.17.4. glTF.animations
     * An array of keyframe animations.
     */
    animations?: TAnimation[];
    /**
     * ### Metadata about the glTF asset.
     */
    asset: TAsset;
    /**
     * ### 5.17.6. glTF.buffers
     * An array of buffers. A buffer points to binary geometry, animation, or skins.
     */
    buffers?: TBuffer[];
    /**
     * ### 5.17.7. glTF.bufferViews
     * An array of bufferViews. A bufferView is a view into a buffer generally representing a subset of the buffer.
     */
    bufferViews?: TBufferView[];
    /**
     * ### 5.17.8. glTF.cameras
     * An array of cameras. A camera defines a projection matrix.
     */
    cameras?: TCamera[];
    /**
     * ### 5.17.9. glTF.images
     * An array of images. An image defines data used to create a texture.
     */
    images?: TImage[];
    /**
     * ### 5.17.10. glTF.materials
     * An array of materials. A material defines the appearance of a primitive.
     */
    materials?: TMaterial[];
    /**
     * ### 5.17.11. glTF.meshes
     * An array of meshes. A mesh is a set of primitives to be rendered.
     */
    meshes?: TMesh[];
    /**
     * ### 5.17.12. glTF.nodes
     * An array of nodes.
     */
    nodes?: TNode[];
    /**
     * ### 5.17.13. glTF.samplers
     * An array of samplers. A sampler contains properties for texture filtering and wrapping modes.
     */
    samplers?: TSampler[];
    /**
     * ### 5.17.14. glTF.scene
     * The index of the default scene. This property MUST NOT be defined, when scenes is undefined.
     */
    scene?: number;
    /**
     * ### 5.17.15. glTF.scenes
     * An array of scenes.
     */
    scenes?: TScene[];
    /**
     * ### 5.17.16. glTF.skins
     * An array of skins. A skin is defined by joints and matrices.
     */
    skins?: TSkin[];
    /**
     * ### 5.17.17. glTF.textures
     * An array of textures.
     */
    textures?: TTexture[];
}

/**
 * 5.18. Image
 * Image data used to create a texture. Image MAY be referenced by an URI (or IRI) or a buffer view index.
 */
export type TImage = TNamedExt & {
    /**
     * ### 5.18.1. image.uri
     * The URI (or IRI) of the image. 
     * Relative paths are relative to the current glTF asset. 
     * Instead of referencing an external file, this field MAY contain a data:-URI. 
     * This field MUST NOT be defined when bufferView is defined.
     * - Format: iri-reference
     */
    uri?: string;
    /**
     * ### 5.18.2. image.mimeType
     * The image’s media type. This field MUST be defined when bufferView is defined.
     */
    mimeType?: 'image/jpeg' | 'image/png';
    /**
     * ### 5.18.3. image.bufferView
     * The index of the bufferView that contains the image. This field MUST NOT be defined when uri is defined.
     * - Minimum: >= 0
     */
    bufferView?: number;
}

/**
 * ### 5.19. Material
 * The material appearance of a primitive.
 */
export type TMaterial = TExt & {
    /**
     * ### 5.19.1. material.name
     * The user-defined name of this object. This is not necessarily unique, e.g., an accessor and a buffer could have the same name, or two accessors could even have the same name.
     */
    name?: string;
    /**
     * ### 5.19.4. material.pbrMetallicRoughness
     * A set of parameter values that are used to define the metallic-roughness material model 
     * from Physically Based Rendering (PBR) methodology. When undefined, all the default values of pbrMetallicRoughness MUST apply.
     */
    pbrMetallicRoughness?: any;
    /**
     * ### 5.19.5. material.normalTexture
     * The tangent space normal texture. The texture encodes RGB components with linear transfer function. 
     * Each texel represents the XYZ components of a normal vector in tangent space. 
     * The normal vectors use the convention +X is right and +Y is up. +Z points toward the viewer. 
     * If a fourth component (A) is present, it MUST be ignored.
     * When undefined, the material does not have a tangent space normal texture.
     */
    normalTexture?: any;
    /**
     * ### 5.19.6. material.occlusionTexture
     * The occlusion texture. 
     * The occlusion values are linearly sampled from the R channel. 
     * Higher values indicate areas that receive full indirect lighting and lower values indicate no indirect lighting. 
     * If other channels are present (GBA), they MUST be ignored for occlusion calculations. 
     * When undefined, the material does not have an occlusion texture.
     */
    occlusionTexture?: any;
    /**
     * ### 5.19.7. material.emissiveTexture
     * The emissive texture. It controls the color and intensity of the light being emitted by the material. 
     * This texture contains RGB components encoded with the sRGB transfer function. 
     * If a fourth component (A) is present, it MUST be ignored. 
     * When undefined, the texture MUST be sampled as having 1.0 in RGB components.
     */
    emissiveTexture?: any;
    /**
     * ### 5.19.8. material.emissiveFactor
     * The factors for the emissive color of the material. 
     * This value defines linear multipliers for the sampled texels of the emissive texture.
     * - default: [0,0,0]
     */
    emissiveFactor?: [number, number, number];

    /**
     * ### 5.19.9. material.alphaMode
     * The material’s alpha rendering mode enumeration specifying the interpretation of the alpha value of the base color.
     */
    alphaMode?: string;
    /**
     * ### 5.19.10. material.alphaCutoff
     * Specifies the cutoff threshold when in MASK alpha mode. 
     * If the alpha value is greater than or equal to this value then it is rendered as fully opaque, otherwise, it is rendered as fully transparent. 
     * A value greater than 1.0 will render the entire material as fully transparent. 
     * This value MUST be ignored for other alpha modes. When alphaMode is not defined, this value MUST NOT be defined.
     * - default: 0.5
     * - Minimum: >= 0
     */
    alphaCutoff?: number;
    /**
     * ### 5.19.11. material.doubleSided
     * Specifies whether the material is double sided. 
     * When this value is false, back-face culling is enabled. 
     * When this value is true, back-face culling is disabled and double-sided lighting is enabled. 
     * The back-face MUST have its normals reversed before the lighting equation is evaluated.
     */
    doubleSided?: boolean;
}

/**
 * ### 5.20. Material Normal Texture Info
 * Reference to a texture.
 */
export type TMaterialNormalTextureInfo = TExt & {
    /**
     * ### 5.20.1. material.normalTextureInfo.index
     * The index of the texture.
     * - Minimum: >= 0
     */
    index: number;
    /**
     * ### 5.20.2. material.normalTextureInfo.texCoord
     * This integer value is used to construct a string in the format TEXCOORD_<set index> 
     * which is a reference to a key in mesh.primitives.attributes (e.g. a value of 0 corresponds to TEXCOORD_0). 
     * A mesh primitive MUST have the corresponding texture coordinate attributes for the material to be applicable to it.
     * - default: 0
     * - Minimum: >= 0
     */
    texCoord?: number;
    /**
     * ### 5.20.3. material.normalTextureInfo.scale
     * The scalar parameter applied to each normal vector of the texture. 
     * This value scales the normal vector in X and Y directions using the formula: scaledNormal = normalize<sampled normal texture value> * 2.0 - 1.0) * vec3(<normal scale>, <normal scale>, 1.0.
     * - default: 1
     */
    scale?: number;
}

/**
 * ### 5.21. Material Occlusion Texture Info
 * Reference to a texture.
 */
export type TMaterialOcclusionTextureInfo = TExt & {
    /**
     * ### 5.21.1. material.occlusionTextureInfo.index
     * - Minimum: >= 0
     */
    index: number;
    /**
     * ### 5.21.2. material.occlusionTextureInfo.texCoord
     * This integer value is used to construct a string in the format TEXCOORD_<set index> 
     * which is a reference to a key in mesh.primitives.attributes (e.g. a value of 0 corresponds to TEXCOORD_0). 
     * A mesh primitive MUST have the corresponding texture coordinate attributes for the material to be applicable to it.
     * - default: 0
     * - Minimum: >= 0
     */
    texCoord?: number;
    /**
     * ### 5.21.3. material.occlusionTextureInfo.strength
     * A scalar parameter controlling the amount of occlusion applied. A value of 0.0 means no occlusion. 
     * A value of 1.0 means full occlusion. 
     * This value affects the final occlusion value as: 1.0 + strength * (<sampled occlusion texture value> - 1.0).
     * - default: 1
     * - Minimum: >= 0
     * - Maximum: <= 1
     */
    strength?: number;
}

/**
 * ### 5.22. Material PBR Metallic Roughness
 * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology.
 */
export type TMaterialPBRMetallicRoughness = TExt & {
    /**
     * ### 5.22.1. material.pbrMetallicRoughness.baseColorFactor
     * The factors for the base color of the material. This value defines linear multipliers for the sampled texels of the base color texture.
     * - Each element in the array MUST be greater than or equal to 0 and less than or equal to 1.
     * - default: [1,1,1,1]
     */
    baseColorFactor?: [number, number, number, number];
    /**
     * ### 5.22.2. material.pbrMetallicRoughness.baseColorTexture
     * The base color texture. 
     * The first three components (RGB) MUST be encoded with the sRGB transfer function. 
     * They specify the base color of the material. If the fourth component (A) is present, it represents the linear alpha coverage of the material. 
     * Otherwise, the alpha coverage is equal to 1.0. 
     * The material.alphaMode property specifies how alpha is interpreted. 
     * The stored texels MUST NOT be premultiplied. 
     * When undefined, the texture MUST be sampled as having 1.0 in all components.
     */
    baseColorTexture?: TTextureInfo;
    /**
     * ### 5.22.3. material.pbrMetallicRoughness.metallicFactor
     * The factor for the metalness of the material. This value defines a linear multiplier for the sampled metalness values of the metallic-roughness texture.
     * - default: 1
     * - Minimum: >= 0
     * - Maximum: <= 1
     */
    metallicFactor?: number;
    /**
     * ### 5.22.4. material.pbrMetallicRoughness.roughnessFactor
     * The factor for the roughness of the material. 
     * This value defines a linear multiplier for the sampled roughness values of the metallic-roughness texture.
     * - default: 1
     * - Minimum: >= 0
     * - Maximum: <= 1 
     */
    roughnessFactor?: number;
    /**
     * ### 5.22.5. material.pbrMetallicRoughness.metallicRoughnessTexture
     * The metallic-roughness texture. 
     * The metalness values are sampled from the B channel. 
     * The roughness values are sampled from the G channel. 
     * These values MUST be encoded with a linear transfer function. 
     * If other channels are present (R or A), they MUST be ignored for metallic-roughness calculations. 
     * When undefined, the texture MUST be sampled as having 1.0 in G and B components.
     */
    metallicRoughnessTexture?: TTextureInfo;
}

/**
 * ### 5.23. Mesh
 * A set of primitives to be rendered. Its global transform is defined by a node that references it.
 */
export type TMesh = TNamedExt & {
    /**
     * ### 5.23.1. mesh.primitives
     * An array of primitives, each defining geometry to be rendered.
     */
    primitives: TMeshPrimitive[];
    /**
     * ### 5.23.2. mesh.weights
     * Array of weights to be applied to the morph targets. 
     * The number of array elements MUST match the number of morph targets.
     */
    weights?: number[];
}

/**
 * ### 5.24. Mesh Primitive
 * Geometry to be rendered with the given material.
 */
export type TMeshPrimitive = TExt & {
    /**
     * ### 5.24.1. mesh.primitive.attributes
     * A plain JSON object, where each key corresponds to a mesh attribute semantic 
     * and each value is the index of the accessor containing attribute’s data.
     * - Type of each property: integer
     */
    attributes: Record<string, number>;
    /**
     * ### 5.24.2. mesh.primitive.indices
     * The index of the accessor that contains the vertex indices. 
     * When this is undefined, the primitive defines non-indexed geometry. 
     * When defined, the accessor MUST have SCALAR type and an unsigned integer component type.
     * - Minimum: >= 0
     * - Related WebGL functions: drawElements() when defined and drawArrays() otherwise.
     */
    indices?: number;
    /**
     * ### 5.24.3. mesh.primitive.material
     * The index of the material to apply to this primitive when rendering.
     * - Minimum: >= 0
     */
    material?: number;
    /**
     * ### 5.24.4. mesh.primitive.mode
     * The topology type of primitives to render.
     * - 0 `POINTS`
     * - 1 `LINES`
     * - 2 `LINE_LOOP`
     * - 3 `LINE_STRIP`
     * - 4 `TRIANGLES`
     * - 5 `TRIANGLE_STRIP`
     * - 6 `TRIANGLE_FAN`
     * - default: 4
     */
    mode?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * ### 5.24.5. mesh.primitive.targets
     * An array of morph targets.
     */
    targets?: Record<string, number>[];
}

/**
 * ### 5.25. Node
 * A node in the node hierarchy. When the node contains skin, all mesh.primitives MUST contain JOINTS_0 and WEIGHTS_0 attributes. 
 * A node MAY have either a matrix or any combination of translation/rotation/scale (TRS) properties. 
 * TRS properties are converted to matrices and postmultiplied in the T * R * S order to compose the transformation matrix; 
 * first the scale is applied to the vertices, then the rotation, and then the translation. 
 * If none are provided, the transform is the identity. 
 * When a node is targeted for animation (referenced by an animation.channel.target), matrix MUST NOT be present.
 */
export type TNode = TNamedExt & {
    /**
     * ### 5.25.1. node.camera
     * The index of the camera referenced by this node.
     */
    camera?: number;
    /**
     * ### 5.25.2. node.children
     * The indices of this node’s children.
     * - Each element in the array MUST be unique.
     * - Each element in the array MUST be greater than or equal to 0.
     * 
     */
    children?: number[];
    /**
     * ### 5.25.3. node.skin
     * The index of the skin referenced by this node. 
     * When a skin is referenced by a node within a scene, all joints used by the skin MUST belong to the same scene. 
     * When defined, mesh MUST also be defined.
     * - Minimum: >= 0
     */
    skin?: number;
    /**
     * ### 5.25.4. node.matrix
     * A floating-point 4x4 transformation matrix stored in column-major order.
     * - default: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
     * - Related WebGL functions: uniformMatrix4fv() with the transpose parameter equal to false
     */
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * ### 5.25.5. node.mesh
     * The index of the mesh in this node.
     * - Minimum: >= 0
     */
    mesh?: number;
    /**
     * ### 5.25.6. node.rotation
     * The node’s unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
     * - Each element in the array MUST be greater than or equal to -1 and less than or equal to 1.
     * - default: [0,0,0,1]
     */
    rotation?: [number, number, number, number];
    /**
     * ### 5.25.7. node.scale
     * The node’s non-uniform scale, given as the scaling factors along the x, y, and z axes.
     * - default: [1,1,1]
     */
    scale?: [number, number, number];
    /**
     * ### 5.25.8. node.translation
     * The node’s translation along the x, y, and z axes.
     * -  default: [0,0,0]
     */
    translation?: [number, number, number];
    /**
     * ### 5.25.9. node.weights
     * The weights of the instantiated morph target. 
     * The number of array elements MUST match the number of morph targets of the referenced mesh. 
     * When defined, mesh MUST also be defined.
     */
    weights: number[];
}

/**
 * ### 5.26. Sampler
 * Texture sampler properties for filtering and wrapping modes.
 */
export type TSampler = TNamedExt & {
    /**
     * ### 5.26.1. sampler.magFilter
     * Magnification filter.
     * - 9728 `NEAREST`
     * - 9729 `LINEAR`
     * Related WebGL functions: samplerParameteri() with pname equal to TEXTURE_MAG_FILTER
     */
    magFilter?: 9728 | 9729;
    /**
     * ### 5.26.2. sampler.minFilter
     * Minification filter.
     * - 9728 `NEAREST`
     * - 9729 `LINEAR`
     * - 9984 `NEAREST_MIPMAP_NEAREST`
     * - 9985 `LINEAR_MIPMAP_NEAREST`
     * - 9986 `NEAREST_MIPMAP_LINEAR`
     * - 9987 `LINEAR_MIPMAP_LINEAR`
     * Related WebGL functions: samplerParameteri() with pname equal to TEXTURE_MIN_FILTER
     */
    minFilter?: 9728 | 9729 | 9984 | 9985 | 9986 | 9987;
    /**
     * ### 5.26.3. sampler.wrapS
     * S (U) wrapping mode. All valid values correspond to WebGL enums.
     * - 33071 `CLAMP_TO_EDGE`
     * - 33648 `MIRRORED_REPEAT`
     * - 10497 `REPEAT`
     */
    wrapS?: 33071 | 33648 | 10497;
    /**
     * ### 5.26.4. sampler.wrapT
     * T (V) wrapping mode.
     * - 33071 `CLAMP_TO_EDGE`
     * - 33648 `MIRRORED_REPEAT`
     * - 10497 `REPEAT`
     */
    wrapT?: 33071 | 33648 | 10497;
}

/**
 * ### 5.27. Scene
 * The root nodes of a scene.
 */
export type TScene = TNamedExt & {
    /**
     * ### 5.27.1. scene.nodes
     * - Each element in the array MUST be unique.
     * - Each element in the array MUST be greater than or equal to 0.
     */
    nodes?: number[];
}

/**
 * ### 5.28. Skin
 * Joints and matrices defining a skin.
 */
export type TSkin = TNamedExt & {
    /**
     * ### 5.28.1. skin.inverseBindMatrices
     * The index of the accessor containing the floating-point 4x4 inverse-bind matrices. 
     * Its accessor.count property MUST be greater than or equal to the number of elements of the joints array. 
     * When undefined, each matrix is a 4x4 identity matrix.
     * - Minimum: >= 0
     */
    inverseBindMatrices?: number;
    /**
     * ### 5.28.2. skin.skeleton
     * The index of the node used as a skeleton root. 
     * The node MUST be the closest common root of the joints hierarchy or a direct or indirect parent node of the closest common root.
     * - Minimum: >= 0
     */
    skeleton?: number;
    /**
     * ### 5.28.3. skin.joints
     * Indices of skeleton nodes, used as joints in this skin.
     * - Each element in the array MUST be unique.
     * - Each element in the array MUST be greater than or equal to 0.
     */
    joints: number[];
}

/**
 * ### 5.29. Texture
 * A texture and its sampler.
 * Related WebGL functions: createTexture(), deleteTexture(), bindTexture(), texImage2D(), and texParameterf()
 */
export type TTexture = TNamedExt & {
    /**
     * ### 5.29.1. texture.sampler
     * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering SHOULD be used.
     * - Minimum: >= 0
     */
    sampler?: number;
    /**
     * ### 5.29.2. texture.source
     * The index of the image used by this texture. 
     * When undefined, an extension or other mechanism SHOULD supply an alternate texture source, otherwise behavior is undefined.
     * - Minimum: >= 0
     */
    source?: number;
}

/**
 * ### 5.30. Texture Info
 * Reference to a texture.
 */
export type TTextureInfo = TExt & {
    /**
     * ### 5.30.1. textureInfo.index
     * The index of the texture.
     * - Minimum: >= 0
     */
    index: number;
    /**
     * ### 5.30.2. textureInfo.texCoord
     * This integer value is used to construct a string in the format TEXCOORD_<set index> which is a reference to a key in mesh.primitives.attributes (e.g. a value of 0 corresponds to TEXCOORD_0). 
     * A mesh primitive MUST have the corresponding texture coordinate attributes for the material to be applicable to it.
     * - default: 0
     * - Minimum: >= 0
     */
    texCoord?: number;

}
