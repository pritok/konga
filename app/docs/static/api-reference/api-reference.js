/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * <img src="/images/konga-logo.png" width="50%">
 *
 * # Konga's API Reference
 *
 * Welcome to Konga's API Reference. Here you got all the documentation, about everything Konga does and gives you. Here you can see a brief introduction about what you can find in each section.
 *
 * ## Metadata
 *
 * This section defines everything `konga-metadata` contains, and what each property and parameter means, and does:
 *
 * * **<i class="fa fa-wrench"></i> Definitions:** Definitions contain individual or grouped properties to configure your metadata. Some of these properties are interpreted by the `ui` giving a more meaningful context to the forms and the interactions engaged with them. Here you got a set of all `konga-metadata` definitions:
 *
 * 	* {@link Metadata.Application `Application`}: Defines your app globally, and the `root` level configuration.
 * 	* {@link Metadata.Entity `Entity`}: Contains the metadata for each entity your app needs to manage.
 * 	* {@link Metadata.Field `Field`}: Includes the definition of each field, with all the required parameters.
 * 	* {@link Metadata.Action `Action`}: Defines each customisation _entry-point_ within your metadata.
 * 	* {@link Metadata.Trigger `Trigger`}: Configure automated actions to be executed every time a field changes.
 * 	* {@link Metadata.ConfigurationParam `ConfigurationParam`}: Define the configuration parameters for your metadata items.
 * 	* {@link Metadata.ShowConfiguration `ShowConfiguration`}: Configure the rendering configuration for a field within a {@link Metadata.FormScopes `form scope`}.
 * 	* {@link Metadata.FieldType `FieldType`}: Define the rendering appeareance for a field within a {@link Metadata.FormScopes `form scope`}.
 * 	* {@link Metadata.DataType `DataType`}: Configure the typology of a field - i.e. data type, allowed values, filtering, querying...
 * 	* {@link Metadata.FieldSet `FieldSet`}: Setup groups among your fields within entities, mostly for category/group-based {@link Metadata.FormTypes `form types`}.
 * 	* {@link Metadata.Validation `Validation`}: Define the required validation options for your fields.
 * 	* {@link Metadata.Validator `Validator`}: Define custom validators to be appended to your {@link Metadata.Validation validation} configuration.
 *
 *
 *
 *
 * * **<i class="fa fa-tag"></i> Enumerations:** Enumerations contain the set of allowed parameters for the properties bound to them. Here you have all existing enumerations.
 *
 * 	* {@link Metadata.AccessModes `AccessModes`}: Define the possible visibility options for an entity within your app. 
 * 	* {@link Metadata.DataTypes `DataTypes`}: Contains the existing _data-types_ Konga can manage natively.
 * 	* {@link Metadata.FieldTypes `FieldTypes`}: Define the possible rendering appeareances fields can have.
 * 	* {@link Metadata.FormScopes `FormScopes`}: Define the existing `scopes` Konga has for building the different kinds of forms.
 * 	* {@link Metadata.FormStyles `FormStyles`}: Configuration options for the field layout within a form.
 * 	* {@link Metadata.FormTypes `FormTypes`}: Contains all possible form rendering configurations for your forms.
 * 	* {@link Metadata.Multiplicities `Multiplicities`}: Define the possible multiplicities - quantity of items per input - for a field. 
 * 	* {@link Metadata.TriggerMatches `TriggerMatches`}: Define the possible trigger configurations for the value to verify matches.
 * 	* {@link Metadata.TriggerMoments `TriggerMoments`}: Contains all possible `moments` where a field verify its triggers.
 * 	* {@link Metadata.ValidatorTypes `ValidatorTypes`}: Includes the possible validation modes for the data within your fields.
 *
 *
 * * **{@link Metadata.Generators <i class="fa fa-terminal"></i> Generators }:** Documents the available methods for generating your metadata.
 * * **{@link Metadata.Permissions <i class="fa fa-key"></i> Permissions }:** Learn here how to engage your Konga app with a rich permission system to restrict access at both entity and field levels.
 *
 * ## Standards
 *
 * Documentation on standard features. {@link Standards Standard features} are enough for building a full-working app, connected to an API. These are the main standard features:
 *
 * * **<i class="fa fa-paint-brush"></i> Modeling:** Define how your metadata is interpreted to build your {@link Standards.Apps `Apps`} and {@link Standards.Forms `Forms`}. It includes examples on every available {@link Metadata.FormScopes `form scope`}, and links to related inner elements.
 * * **<i class="fa fa-user"></i> Users:** Define how your user management integrates into Konga, and the features you can leverage using this system. 
 * * **<i class="fa fa-gamepad"></i> Tools:** Documents the set of tools Konga uses to manage your metadata, and the macros you can use to save time while developing.
 * * **<i class="fa fa-wrench"></i> Operations:** Documents all built-in operations for managing your application and its interactions.
 *
 * # TODO Customisation
 *
 *
 * ## konga
 *
 * This module documents directly Konga's code. It's then the real 'API reference'. Each part of this module technically explains all procedures under its hood, and it's tightly relatated to one or more definitions of the other modules - that include both technical and business literature.
 *
 * ### Controllers
 * 
 * * **{@link konga.controller:KongaController `KongaController`}:** This is the main controller of Konga, and gives your application access to all Konga's features and operations.
 * * **{@link konga.controller:EntitySearchController `EntitySearchController`}:** Engaged on {@link Metadata.FormScopes#properties_SEARCH `search`} and {@link Metadata.FormScopes#properties_RESULTS `results`} form scopes, it controls all required tasks and behaviors to allow full functioning of {@link konga.directive:searchPane `search panes`} and {@link konga.directive:resultTable `result tables`}.
 * * **{@link konga.controller:EntityUpdateController `EntityUpdateController`}:** Used on {@link Metadata.FormScopes#properties_UPDATE `updates`}, it's responsible for building the update form, controlling all operations engaged within the form and its fields, and all the tasks involved with them.
 *
 * 
 * ### Directives
 *
 * 
 * 
 * 
 * 
 */