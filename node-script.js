const fs = require('fs')
const {MongoClient} = require('mongodb');
const yaml = require('js-yaml')

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    let localURI = null;
    let remoteURI = null;
    let localClient = null;
    let remoteClient = null;
    try {
        console.log('fetching collections ...')
        let configContents = fs.readFileSync('./config.yml', 'utf8');
        let specificCollectionsContents = fs.readFileSync('./specific_collections.yml', 'utf8');
        let config_db = yaml.load(configContents);
        let config_sp_coll = yaml.load(specificCollectionsContents);

        localURI = `mongodb://${config_db.local.host.url}:${config_db.local.host.port}/${config_db.local.db}?retryWrites=true&w=majority`;
        remoteURI = `mongodb://${config_db.remote.host.url}:${config_db.remote.host.port}/${config_db.remote.db}?retryWrites=true&w=majority`;
        localClient = new MongoClient(localURI);
        remoteClient = new MongoClient(remoteURI);

        await localClient.connect();
        await remoteClient.connect();
        
        console.log('finding collections differences ...')
        const localDB = await getDatabaseHash(localClient, 'Goveva_v1');
        const remoteDB = await getDatabaseHash(remoteClient, 'Goveva_v1');
        const dirtyDatabases = getDirtyDatabases(localDB.collections, remoteDB.collections, config_sp_coll)
        if (!fs.existsSync(config_sp_coll.diff_checker.temp_directory_path)) fs.mkdirSync(config_sp_coll.diff_checker.temp_directory_path);
        fs.writeFileSync(`./${config_sp_coll.diff_checker.temp_directory_path}/dirtyDatabases`, dirtyDatabases.join(' ').toString());
        
        console.log('fetch done.')
        console.log('list : ',dirtyDatabases)
    } catch (e) {
        console.error(e);
    } finally {
        await localClient.close();
        await remoteClient.close();
    }
}

/**
 * Helpers
 */
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getDatabaseHash(client, database){
    return await client.db(database).command( { dbHash: 1 } );
};

function getDirtyDatabases(localDBCollections, remoteDBCollections, specificCollectionsConfig){
    let result=[];
    for(const key in remoteDBCollections) {
        if(specificCollectionsConfig.diff_checker.skip_collections.indexOf(key) === -1
            && remoteDBCollections[key] !== localDBCollections[key]){ 
            result.push(key)
        }
    }
    return result;
};
 
main().catch(console.error);