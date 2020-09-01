import qdi
from typing import Any, Callable, Optional, Sequence
from functools import lru_cache, partial
from fastapi import Depends
from services.scissors import ImagesService, Storage

class Bootstapper:

    def bootstrap(self):
        c = Bootstapper.container()
        c.register_instance(qdi.IContainer, c)
        c.register_instance(qdi.IFactory, qdi.Factory(c))

        # services
        c.register_singleton(Storage)
        c.register_singleton(ImagesService)

#        c.register_singleton(Camera)
#        c.register_singleton(ProjectManager)
#        c.register_singleton(VideoTracker)
#        c.register_singleton(ImageDraw)
#        c.register_singleton(WebSocketManager)
#
#        #c.register_instance(ITFModel,SSD_TFModel("/app/trt_graph.pb"),'ssd')
#        c.register_instance(ITFModel, ITFModel())
#
#        # controllers
#        c.register(IController, ProjectController, "project")
#        c.register(IController, VideoController, "video")
#        c.register(IController, TFModelController, "tfmodel")
#
#        # workers
#        c.register_singleton(IWorker, TFModelWorker, 'tfmodel_worker')
#        c.register_singleton(IWorker, PredictionsWorker, 'predictions_worker')

        #camera = c.resolve(Camera)
        #return_value, image = camera.read()
        #model = c.resolve(ITFModel,'ssd')
        #res=model.predict(image)
        #image_draw=c.resolve(ImageDraw)
        #image=image_draw.process(image,res)

        return c

    @staticmethod
    @lru_cache()
    def container():
        return qdi.Container()


def Injects(from_cls: Any, key: str='') -> Any:
    dependency=partial(Bootstapper.container().resolve, from_cls, key)
    return Depends(dependency)

