Directives and their partials are structured by components

A subdirectory is created for each component.
The component partials are directly stored in the subdirectory.

The partials are loaded individually at runtime in debug mode but preloaded in a template cache for production.
For this mechanism to work correctly the directive template URL must follow some conventions:

In the directive, the template url is written as follow: "templateUrl: testgeomapfish.baseTemplateUrl + '/<component>/<partial>.html'".

In the main html file, the debug section should contain "testgeomapfish.baseTemplateUrl = '${request.static_url("testgeomapfish_geoportal:static-ngeo/components")}';"
