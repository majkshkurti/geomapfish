<%doc>
This file defines map config for both the Simple and the
Extended APIs.
</%doc>

        var WMTS_OPTIONS = {
            url: '${tiles_url}',
            displayInLayerSwitcher: false,
            requestEncoding: 'REST',
            buffer: 0,
            transitionEffect: "resize",
            visibility: false,
            style: 'default',
            dimensions: ['TIME'],
            params: {
                'time': '2014'
            },
            matrixSet: 'swissgrid',
            maxExtent: new OpenLayers.Bounds(420000, 30000, 900000, 350000),
            projection: new OpenLayers.Projection("EPSG:32634"),
            units: "m",
            formatSuffix: 'png',
            serverResolutions: [1000,500,250,100,50,20,10,5,2.5,2,1.5,1,0.5,0.25,0.1,0.05]
        };

        var INITIAL_EXTENT = [420000, 30000, 900000, 350000];
        var RESTRICTED_EXTENT = [420000, 30000, 900000, 350000];

        var mapConfig = {
            xtype: 'cgxp_mappanel',
            projection: "EPSG:32634",
            units: "m",
            projectionCodes: [32634, 4326],
            extent: INITIAL_EXTENT,
            maxExtent: RESTRICTED_EXTENT,
            restrictedExtent: RESTRICTED_EXTENT,
            stateId: "map",
            theme: null,
            resolutions: [1000,500,250,100,50,20,10,5,2.5,1,0.5,0.25,0.1,0.05],
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar({panIcons: false}),
                new OpenLayers.Control.ArgParser(),
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.ScaleLine({
                    geodesic: true,
                    bottomInUnits: false,
                    bottomOutUnits: false
                }),
                new OpenLayers.Control.LayerSwitcher(),
                // Static image version
                /*
                new OpenLayers.Control.OverviewMap({
                    size: new OpenLayers.Size(200, 100),
                    layers: [new OpenLayers.Layer.Image(
                        "Overview Map",
                        "${request.static_url('TestGeoMapFishPackage_geoportal:static/images/overviewmap.png') | n}",
                        OpenLayers.Bounds.fromArray([420000, 30000, 900000, 350000]),
                        new OpenLayers.Size(200, 100),
                        {isBaseLayer: true}
                    )],
                    mapOptions: {
                        theme: null,
                        projection: new OpenLayers.Projection("EPSG:32634"),
                        restrictedExtent: OpenLayers.Bounds.fromArray([420000, 30000, 900000, 350000]),
                        units: "m",
                        numZoomLevels: 1
                    }
                }),*/
                // OSM version
                new OpenLayers.Control.OverviewMap({
                    size: new OpenLayers.Size(200, 100),
                    mapOptions: {
                        theme: null
                    },
                    minRatio: 64,
                    maxRatio: 64,
                    layers: [new OpenLayers.Layer.OSM("OSM", [
                            'http://a.tile.openstreetmap.org/${"${z}/${x}/${y}"}.png',
                            'http://b.tile.openstreetmap.org/${"${z}/${x}/${y}"}.png',
                            'http://c.tile.openstreetmap.org/${"${z}/${x}/${y}"}.png'
                        ], {
                            transitionEffect: 'resize',
                            attribution: [
                                "(c) <a href='http://openstreetmap.org/'>OSM</a>",
                                "<a href='http://creativecommons.org/licenses/by-sa/2.0/'>by-sa</a>"
                            ].join(' ')
                        }
                    )]
                }),
                new OpenLayers.Control.MousePosition({numDigits: 0})
            ],
            layers: [{
                source: "olsource",
                type: "OpenLayers.Layer.WMTS",
                args: [OpenLayers.Util.applyDefaults({
                    name: OpenLayers.i18n('ortho'),
                    mapserverLayers: 'ortho',
                    ref: 'ortho',
                    layer: 'ortho',
                    formatSuffix: 'jpeg',
                    opacity: 0
                }, WMTS_OPTIONS)]
            },
            {
                source: "olsource",
                type: "OpenLayers.Layer.WMTS",
                group: 'background',
                args: [OpenLayers.Util.applyDefaults({
                    name: OpenLayers.i18n('plan'),
                    mapserverLayers: 'plan',
                    ref: 'plan',
                    layer: 'plan',
                    group: 'background'
                }, WMTS_OPTIONS)]
            },
            {
                source: "olsource",
                type: "OpenLayers.Layer",
                group: 'background',
                args: [OpenLayers.i18n('blank'), {
                    displayInLayerSwitcher: false,
                    ref: 'blank',
                    group: 'background'
                }]
            }],
            items: []
        };
