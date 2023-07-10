import { Category } from "./entities/Category";
import { City } from "./entities/City";
import { POI } from "./entities/POI";
import { User } from "./entities/User";
import dataSource from "./utils";

const start = async (): Promise<void> => {
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.synchronize();

  /** ----------- Cities ------------ **/

  // Colmar
  await dataSource.getRepository(City).save({
    name: "Colmar",
    picture:
      "https://static.actu.fr/uploads/2021/08/1446540341-58ac3304d9-b-960x640.jpg",
    latitude: 48.0789,
    longitude: 7.3594,
  });
  const colmar = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Colmar" });

  // Lille
  await dataSource.getRepository(City).save({
    name: "Lille",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lille_gd_place_colonne.jpg/1280px-Lille_gd_place_colonne.jpg",
    latitude: 50.6283,
    longitude: 3.0573,
  });
  const lille = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Lille" });

  // Strasbourg
  await dataSource.getRepository(City).save({
    name: "Strasbourg",
    picture:
      "https://pokaa.fr/wp-content/uploads/2020/07/cathedrale-illumination-20207.jpeg",
    latitude: 48.5735,
    longitude: 7.7534,
  });
  const strasbourg = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Strasbourg" });

  // Troyes
  await dataSource.getRepository(City).save({
    name: "Troyes",
    picture:
      "https://cdn.discordapp.com/attachments/1096407741234421851/1116278754403160084/Capture_decran_2023-06-08_101302.png",
    latitude: 48.297,
    longitude: 4.0746,
  });
  const troyes = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Troyes" });

  const cities = await dataSource.getRepository(City).find();

  /** ----------- Categories ------------ **/

  // Restaurant
  await dataSource.getRepository(Category).save({
    name: "Restaurant",
  });

  const restaurant = await dataSource
    .getRepository(Category)
    .findOneByOrFail({ name: "Restaurant" });

  // Monument
  await dataSource.getRepository(Category).save({
    name: "Monument",
  });

  const monument = await dataSource
    .getRepository(Category)
    .findOneByOrFail({ name: "Monument" });

  // Parc
  await dataSource.getRepository(Category).save({
    name: "Parc",
  });

  const parc = await dataSource
    .getRepository(Category)
    .findOneByOrFail({ name: "Parc" });

  const categories = await dataSource.getRepository(Category).find();

  /** ----------- POIs ------------ **/

  const colmarPOI = new POI();
  colmarPOI.city = colmar;
  colmarPOI.latitude = 48.108400961583506;
  colmarPOI.longitude = 7.363689309665272;
  colmarPOI.address = "45 Rte de Strasbourg, 68000 Colmar";
  colmarPOI.name = "Statue de la Liberté";
  colmarPOI.description = "La plus belle statue du monde";
  colmarPOI.picture = "";
  colmarPOI.rating = 5;
  colmarPOI.categories = [monument];

  await dataSource.getRepository(POI).save(colmarPOI);

  const lillePOI = new POI();
  lillePOI.city = lille;
  lillePOI.latitude = 50.63708377201713;
  lillePOI.longitude = 3.0634739415288417;
  lillePOI.address = "Colonne de la Déesse, Place du Général de Gaulle, Lille";
  lillePOI.name = "Colonne de la Déesse";
  lillePOI.description = "La plus belle colonne du monde";
  lillePOI.picture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lille_gd_place_colonne.jpg/1280px-Lille_gd_place_colonne.jpg";
  lillePOI.rating = 5;
  lillePOI.categories = [monument, parc];
  await dataSource.getRepository(POI).save(lillePOI);

  const strasbourgPOI = new POI();
  strasbourgPOI.city = strasbourg;
  strasbourgPOI.latitude = 48.58202057037567;
  strasbourgPOI.longitude = 7.751055787174232;
  strasbourgPOI.address = "Pl. de la Cathédrale, 67000 Strasbourg";
  strasbourgPOI.name = "Cathédrale Notre-Dame de Strasbourg";
  strasbourgPOI.description = "La plus belle cathédrale du monde";
  strasbourgPOI.picture =
    "https://pokaa.fr/wp-content/uploads/2020/07/cathedrale-illumination-20207.jpeg";
  strasbourgPOI.rating = 5;
  strasbourgPOI.categories = [parc];
  await dataSource.getRepository(POI).save(strasbourgPOI);

  const troyesPOI = new POI();
  troyesPOI.city = troyes;
  troyesPOI.latitude = 48.29978058942174;
  troyesPOI.longitude = 4.07700267026032;
  troyesPOI.address = "Quai de Dampierre, 10000 Troyes";
  troyesPOI.name = "Le Cœur de Troyes";
  troyesPOI.description = "Le plus beau coeur du monde";
  troyesPOI.picture = "";
  troyesPOI.rating = 5;
  troyesPOI.categories = [monument, restaurant];
  await dataSource.getRepository(POI).save(troyesPOI);

  const poi = await dataSource
    .getRepository(POI)
    .find({ relations: { city: true, categories: true } });

  /** ----------- Users ------------ **/

  // Victor
  await dataSource.getRepository(User).save({
    name: "Victor",
    city: colmar,
    email: "victor@cityguide.fr",
    hashedPassword: "mySecretHashedPassword",
  });

  const users = await dataSource
    .getRepository(User)
    .find({ relations: { city: true } });

  console.log(JSON.stringify(poi, null, 2));
  console.log(cities);
  console.log(users);
  console.log(categories);
};

void start();
