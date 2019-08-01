<template>
  <el-container>
    <el-header>arcgis-vue demo</el-header>
    <el-main>
      <div id="mapView"></div>
    </el-main>
    <el-footer height="40px">create by linkzz</el-footer>
  </el-container>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  /**
   * 挂载钩子中加载地图
   */
  mounted() {
    console.log("加载地图");
    const options = {
      url:
        "http://linkzz.arcgis.com/arcgis_js_v411_api/arcgis_js_api/library/4.11/dojo/dojo.js"
    };
    loadModules(
      [
        "esri/Map",
        "esri/Basemap",
        "esri/layers/TileLayer",
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
      ],
      options
    )
      .then(([Map, Basemap, TileLayer, MapView, FeatureLayer]) => {
        // 底图
        const basemap = new Basemap({
          baseLayers: [
            new TileLayer({
              url:
                "http://106.15.11.34:6080/arcgis/rest/services/gx_jc/MapServer"
            })
          ]
        });

        let map = new Map({
          basemap: basemap
        });

        let virtualPassage = new FeatureLayer({
          url:
            "http://106.15.11.34:6080/arcgis/rest/services/gx_map/MapServer/4",
          title: "虚拟通道图层",
          outFields: "*",
          renderer: {
            type: "simple",
            label: "虚拟通道{XNTDID}",
            symbol: {
              type: "simple-line",
              color: [0, 0, 0, 0.5]
            }
          }
        });

        let shaftLayer = new FeatureLayer({
          url:
            "http://106.15.11.34:6080/arcgis/rest/services/guanxian/guanxian/MapServer/0",
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-marker",
              size: 6,
              color: "red",
              outline: {
                width: 0.5,
                color: "white"
              }
            }
          }
        });

        let pipeLayer = new FeatureLayer({
          url:
            "http://106.15.11.34:6080/arcgis/rest/services/guanxian/guanxian/MapServer/1"
        });

        map.layers.add(virtualPassage, 0);
        map.layers.add(shaftLayer, 0);
        map.layers.add(pipeLayer, 0);

        let view = new MapView({
          map: map,
          container: "mapView",
          center: [-118.71511, 34.09042],
          zoom: 11,
          ui: {
            components: []
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style lang="stylus" scoped>
@import url('http://linkzz.arcgis.com/arcgis_js_v411_api/arcgis_js_api/library/4.11/esri/css/main.css');

.el-container {
  text-align: center;

  .el-header {
    background-color: #ccc;
    font-size: 27px;
    font-weight: bolder;
    line-height: 60px;
  }

  .el-main {
    #mapView {
      height: 590px;
      width: 100%;
    }
  }

  .el-footer {
    line-height: 40px;
    background-color: #eee;
  }
}
</style>

