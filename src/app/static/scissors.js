Vue.component("dropzone",{
  template: `<div class='dropzone'></div>`,
  props: {
    currentProject: null,
  },
  data() {
    return {
      uploadDropzone: null,
      modelName: Date.now().toString()
    };
  },
  methods: {
      reload(){
      }
  },
  mounted(){
    this.uploadDropzone= new Dropzone(this.$el, {
        url:"/api/scissors/"+this.modelName, 
        paramName: "file",
        method: "post",
        timeout: 36000000,
        responseType: 'arraybuffer',
        success: function(file, response){
            console.log(file)
            var imageBlob = response;
            var imageBytes = btoa(
              new Uint8Array(response)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

                var outputImg = document.getElementById('output');
                outputImg.src = 'data:image/png;base64,'+imageBytes;

                var inputImg = document.getElementById('input');
                inputImg.src = file.dataURL;

                //var blob = new Blob(new Uint8Array(response), {type: "image/png"});
                //saveAs(blob, 'out.png');


        }
    });
  }
})

Vue.component('train', {
  data: function () {
    return {
      show: true,
      snackbarContainer: document.querySelector('#toast'),
      packages: null,
      intervalId: null
    }
  },
  props: {
    currentProject: null
  },
  methods: {
    train_info(){
	    axios.get("/api/training").then(response => {
            this.packages=response.data;
	    });
    },
    download(modelName) {
        console.log(modelName);
	    axios.get("/api/training/"+modelName,{
            responseType: 'arraybuffer'
        }).then(response => {
            var blob=new Blob([response.data])
            console.log(blob);
            saveAs(blob,'trt_graph.pb');
	    });
    }
  },
  created(){
      //this.intervalId = setInterval(this.train_info, 5000);
      //  axios.get("/static/woman.jpg",{
      //        responseType: 'arraybuffer'
      //    }).then(response => {
      //        var blob=new Blob([response.data])
      //        console.log(blob);
      //        var formData = new FormData();
      //        formData.append("file", blob);
      //        axios.post('/api/scissors/333', formData, {
      //            headers: {
      //              'Content-Type': 'multipart/form-data'
      //            }, responseType: 'arraybuffer'

      //        }).then(res => {
      //            console.log(res);

      //        var imageBlob = res.data;
      //        var imageBytes = btoa(
      //          new Uint8Array(res.data)
      //            .reduce((data, byte) => data + String.fromCharCode(byte), '')
      //        );

      //            var outputImg = document.getElementById('output');
      //            outputImg.src = 'data:image/png;base64,'+imageBytes;

      //        });
	  //    });
     
  },
  updated(){
      if(this.$refs.dropzone !== undefined){
        this.$refs.dropzone.reload(this.currentProject);
      }
  },
  template: `
  <main class="mdl-layout__content mdl-color--grey-100" v-if="show">
  <div class="mdl-grid demo-content">
    <div class="demo-card-square mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__title mdl-card--expand">
            <!--<h2 class="mdl-card__title-text">AI Scissors</h2>-->
            <img src="/static/logo.png" width="270px" />
        </div>
        <!--<div class="mdl-card__supporting-text">
            Upload image file.
        </div>-->


        <div class="mdl-card__actions mdl-card--border">
            <dropzone :current-project="currentProject" ref="dropzone"></dropzone>
            <br/>
            <img id="input" width="49%" />
            <img id="output" width="49%" />
        </div>
    </div>
    </div>
</main>
  `
});
