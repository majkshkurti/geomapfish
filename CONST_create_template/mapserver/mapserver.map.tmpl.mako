#
# MapServer Mapfile
#
# Test requests:
#
# WMS GetCapabilities:
# /mapserv?service=wms&version=1.1.1&request=getcapabilities
#
# WMS GetMap:
# /mapserv?service=wms&version=1.1.1&request=getmap&bbox=-180,-90,180,90&layers=countries&width=600&height=400&srs=EPSG:4326&format=image/png
#
# WMS GetFeatureInfo:
# /mapserv?service=wms&version=1.1.1&request=getfeatureinfo&bbox=-180,-90,180,90&layers=countries&query_layers=countries&width=600&height=400&srs=EPSG:4326&format=image/png&x=180&y=90&info_format=application/vnd.ogc.gml
#

MAP
    NAME "TestGeoMapFishPackage"

    # For Windows users: uncomment this line and adapt it to your
    # own mapserver's nad folder (use regular slash "/")
    # CONFIG "PROJ_LIB" "C:/path/to/ms4w/proj/nad"

    EXTENT 465005.34 0.00 833978.56 9329005.18 ## should be defined for better performance
    UNITS METERS

    # RESOLUTION and DEFRESOLUTION default to 96. If you
    # change RESOLUTION to some other value, also change
    # DEFRESOLUTION. See
    # http://mapserver.org/development/rfc/ms-rfc-55.html
    RESOLUTION 96 ## Also set in Openlayers especially for legends
    DEFRESOLUTION 96

    # MAXSIZE should not be less than 5000 for MF print on A3
    MAXSIZE 5000

    SHAPEPATH '/var/sig/TestGeoMapFishPackage'

    IMAGECOLOR 255 255 255
    STATUS ON

    FONTSET "fonts.conf"
    #SYMBOLSET "symbole.sym"

    OUTPUTFORMAT
        NAME jpeg
        DRIVER "AGG/JPEG"
        MIMETYPE "image/jpeg"
        IMAGEMODE RGB
        EXTENSION "jpeg"
        FORMATOPTION "QUALITY=75,PROGRESSIVE=TRUE"
    END

    OUTPUTFORMAT
        NAME png
        DRIVER AGG/PNG
        MIMETYPE "image/png"
        IMAGEMODE RGBA
        EXTENSION "png"
        FORMATOPTION "INTERLACE=OFF"
        FORMATOPTION "QUANTIZE_DITHER=OFF"
        FORMATOPTION "QUANTIZE_FORCE=ON"
        FORMATOPTION "QUANTIZE_COLORS=256"
    END

    PROJECTION
        "init=epsg:32634"
    END

    WEB
        METADATA
            "wms_title" "changeme"
            "wms_abstract" "changeme"
            "ows_service_onlineresource" "${web_protocol}://${host}${entry_point}mapserv_proxy?ogcserver=source%20for%20image%2Fpng"
            "wms_srs" "EPSG:32634"
            "wms_encoding" "UTF-8"
            "wms_enable_request" "*"
            "wfs_enable_request" "!*"
            "wfs_encoding" "UTF-8"
        END
    END

    LEGEND
        LABEL
            ENCODING "UTF-8"
            TYPE TRUETYPE
            FONT "Arial"
            SIZE 9
        END
    END

    INCLUDE "demo.map"

END
