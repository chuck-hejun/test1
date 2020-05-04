const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const uuid = require('uuid');

let exportedMethods = {
	
	
  async getBand(id){
    if (!id) throw "You must provide an id to search for";

    const bandCollection = await bands();

    const band = await bandCollection.findOne({ _id: id });
    if (band === null) throw "No band with that id";

    return band;kkk
  },

async addBand(bandName, bandMembers, yearFormed, genres,recordLabel){
	  if (!bandName) throw "You must provide a bandName";
    if (! Array || !Array.isArray(bandMembers)) throw "You must provide a band of array type";
    if (! yearFormed) throw "You must provide a yearFormed";
    if (!genres || !Array.isArray(genres))
    throw "You must provide an array of genres";
    if (!recordLabel) throw "You must specify a recordLabel";

	  

    const bandCollection = await bands();
    

    const newBand = {
      _id: uuid.v4(),
      bandName: bandName,
      bandMembers: bandMembers,
	    yearFormed:yearFormed,
      genres: genres,
      recordLabel:recordLabel,
      albums: []
	    
      
    };

    const insertInfo = await bandCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0) throw "Could not add band";
    const newId = insertInfo.insertedId;
    const band = await this.getBand(newId);

    return band;
  },
  async getAllBands() {
    const bandCollection = await bands();

    const band = await bandCollection.find({}).toArray();

    return band;
  },
  async removeBand(id) {
	 if(!id) throw "You must provide an id!"
    const bandCollection = await bands();
    const deletionInfo = await bandCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    return true;
  },


async updateBand(id,bandName, bandMembers, yearFormed, genres,recordLabel){
  if (!bandName) throw "You must provide a bandName";
  if (! Array || !Array.isArray(bandMembers)) throw "You must provide a band of array type";
  if (! yearFormed) throw "You must provide a yearFormed";
  if (!genres || !Array.isArray(genres))
  throw "You must provide an array of genres";
  if (!recordLabel) throw "You must specify a recordLabel";
  


    let bandupdatedInfo = {
      
      bandName: bandName,
      bandMembers: bandMembers,
	    yearFormed:yearFormed,
      genres: genres,
      recordLabel:recordLabel
      
    };
    const bandCollection = await bands();
    const updatedInfo = await bandCollection.updateOne({_id: id}, {$set: bandupdatedInfo});

    if (!updateInfo.matchedCount && updatedInfo.modifiedCount === 0) {
      throw "could not update band successfully";
    }
    return await this.getBand(id);
  },

  async addAlbumToBand (bandId, albumId) {

    const bandCollection = await bands();
    let bandChanged=await bandCollection.getBand(bandId);
    bandChanged.albums.push[albumId];
    const updatedInfo = await bandCollection.updateOne({_id: id}, {$set: bandChanged});
    if (!updateInfo.matchedCount && updatedInfo.modifiedCount === 0) {
      throw "could not update band successfully";
    }
    return await this.getBand(bandId);
  }

};

module.exports = exportedMethods;

