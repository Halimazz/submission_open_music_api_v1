class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    const { name = "unnamed", year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: "success",
      message: "Album succesfully added",
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }
  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: "success",
      data: {
        albums,
      },
    };
  }
  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: "success",
      data: {
        album,
      },
    };
  }
  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;
    await this._service.editAlbumById(id, { name, year });
    return {
      status: "success",
      message: "Album successfully updated",
    };
  }
  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: "success",
      message: "Album successfully deleted",
    };
  }
}

export default AlbumsHandler;
