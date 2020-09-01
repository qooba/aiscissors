
class Storage:
    def __init__(self): ...

    def process(self):
        return 'hello from storage'



class ImagesService:
    def __init__(self, storage: Storage):
        self.storage=storage

    def process(self):
        return self.storage.process()


