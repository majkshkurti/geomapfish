% if debug:
    <%!
    from jstools.merge import Merger
    %>
    <%
    jsbuild_cfg = request.registry.settings.get('jsbuild_cfg')
    jsbuild_root_dir = request.registry.settings.get('jsbuild_root_dir')
    %>
    % for script in Merger.from_fn(jsbuild_cfg.split(), root_dir=jsbuild_root_dir).list_run(['api.js', 'api-lang-%s.js' % lang]):
document.write('<script type="text/javascript" src="'
        + "${request.static_url(script.replace('/', ':', 1))}" + '"></script>');
    % endfor

document.write('<link rel="stylesheet" type="text/css" href="'
        + "${request.static_url('testgeomapfish_geoportal:static/lib/cgxp/openlayers/theme/default/style.css')}" + '" />');
document.write('<link rel="stylesheet" type="text/css" href="'
        + "${request.static_url('testgeomapfish_geoportal:static/css/proj-map.css')}" + '" />');
% else:
document.write('<scr' + 'ipt type="text/javascript" src="'
        + "${request.static_url('testgeomapfish_geoportal:static/build/api.js', _query=url_params)}" + '"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'
        + "${request.static_url('testgeomapfish_geoportal:static/build/api-lang-%s.js' % lang, _query=url_params)}" + '"></scr' + 'ipt>');
document.write('<link rel="stylesheet" type="text/css" href="'
        + "${request.static_url('testgeomapfish_geoportal:static/build/api.css', _query=url_params)}" + '" />');
% endif


testgeomapfish = {};
testgeomapfish.Map = function(config) {
    if (!this.initMap) {

        /*
         * Initialize the API.
         * - Set globals
         * - Create child class
         */

        OpenLayers.Number.thousandsSeparator = ' ';
        OpenLayers.DOTS_PER_INCH = 96;
        OpenLayers.ImgPath = "${request.static_url('testgeomapfish_geoportal:static/lib/cgxp/core/src/theme/img/ol/') | n}";
        OpenLayers.Lang.setCode("${lang}");

        OpenLayers.inherit(testgeomapfish.Map, cgxp.api.Map);

        testgeomapfish.Map.prototype.initMap = function() {
            <%include file="mapconfig.js"/>
            this.initMapFromConfig(mapConfig);
        };

        return new testgeomapfish.Map(config);
    }

    this.wmsURL = "${request.route_url('mapserverproxy') | n}";
    this.queryableLayers = ${queryable_layers|n};
    return cgxp.api.Map.call(this, config);
};
