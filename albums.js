
const mongoCollections = require("../config/mongoCollections");
const albums = mongoCollections.albums;
const uuid = require('uuid');
let exportedMethods = {

    async getAlbum(id){
        if (!id) throw "You must provide an id to search for";
    
        const albumCollection = await albums();
    
        const album = await albumCollection.findOne({ _id: id });
        if (album === null) throw "No album with that id";
    
        return album;
      },
    async getAllAlbums() {
        const albumCollection = await albums();
    
        const album = await albumCollection.find({}).toArray();
    
        return album;
      },
    async addAlbum(title,author,songs){
    if (!title) throw "You must provide a title";
 
    if (! authorId) throw "You must provide a authorId";
    if (! authorId) throw "You must provide a authorId";
    if (!songs || !Array.isArray(songs))
    throw "You must provide an array of songs";


    const albumCollection = await albums();
    // const bandThatPosted = await users.getBand(authorId);

    const newalbum = {
    _id: uuid.v4(),
    title: title,
     author:author, 
    //   id:authorId,
    //   bandname: `${bandThatPosted.bandName}`
    // },
    songs: songs
    
    };

  const insertInfo = await albumCollection.insertOne(newalbum);
  if (insertInfo.insertedCount === 0) throw "Could not create album";
  const newId = insertInfo.insertedId;
  const album = await this. getAlbum(newId);

  return album;
},



async deleteAlbum(id) {
    if(!id) throw "You must provide an id!"
   const albumCollection = await albums();
   const deletionInfo = await albumCollection.removeOne({ _id: id });

   if (deletionInfo.deletedCount === 0) {
     throw `Could not delete album with id of ${id}`;
   }
   return true;
 },
 async updateAlbum(id,title,songs){
    if (!title) throw "You must provide a title";
 
    if (!songs || !Array.isArray(songs))
    throw "You must provide an array of songs";
  
  
      let updatedInfo = {
 
    title: title,
    songs: songs
      };
      const albumCollection = await albums();
       updatedInfo = await albumCollection.updateOne({_id: id}, {$set: updatedInfo});
  
      if (updatedInfo.modifiedCount === 0) {
        throw "could not update album successfully";
      }
      return await this.getAlbum(id);
    }
};

module.exports = exportedMethods;