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
  });
  const colmar = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Colmar" });

  // Lille
  await dataSource.getRepository(City).save({
    name: "Lille",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lille_gd_place_colonne.jpg/1280px-Lille_gd_place_colonne.jpg",
  });
  const lille = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Lille" });

      // Saint-Dié-Des-Vosges
  await dataSource.getRepository(City).save({
    name: "Saint-Dié-Des-Vosges",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lille_gd_place_colonne.jpg/1280px-Lille_gd_place_colonne.jpg",
    latitude: 48.2900,
    longitude: 6.9305,
  });
  const SaintDié = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Saint-Dié-Des-Vosges" });

  // Strasbourg
  await dataSource.getRepository(City).save({
    name: "Strasbourg",
    picture:
      "https://pokaa.fr/wp-content/uploads/2020/07/cathedrale-illumination-20207.jpeg",
  });
  const strasbourg = await dataSource
    .getRepository(City)
    .findOneByOrFail({ name: "Strasbourg" });

  // Troyes
  await dataSource.getRepository(City).save({
    name: "Troyes",
    picture:
      "https://cdn.discordapp.com/attachments/1096407741234421851/1116278754403160084/Capture_decran_2023-06-08_101302.png",
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

      // Bar
  await dataSource.getRepository(Category).save({
    name: "Bar",
  });

  const bar = await dataSource
    .getRepository(Category)
    .findOneByOrFail({ name: "Bar" });

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
  const poiData = [
    // POI for Colmar
    {
      city: colmar,
      latitude: 48.108400961583506,
      longitude: 7.363689309665272,
      address: "45 Rte de Strasbourg, 68000 Colmar",
      name: "Statue de la Liberté",
      description: "La plus belle statue du monde",
      picture: "client/src/assets/PictPoi/statueDeLaLiberté.jpeg",
      rating: 5,
      categories: [monument],
    },
    // POI for SaintDié
    {
      city: SaintDié,
      latitude: 48.28669346812704,
      longitude: 6.947476999908756,
      address: "Tour de la Liberté, 5 Pl. Jules Ferry, 88100 Saint-Dié-des-Vosges",
      name: "Tour de la Liberté",
      description: "La tour de la liberté est un monument de Saint-Dié-des-Vosges, ressemblant à un grand oiseau blanc posé au milieu du parc Mansuy. Elle symbolise la recherche de tous les peuples, la liberté.",
      picture: "client/src/assets/PictPoi/tourDeLaLiberté.jpg",
      rating: 4,
      categories: [monument, parc],
    },
    {
      city: SaintDié,
      latitude: 48.28638528719975,
      longitude: 6.950666958126326,
      address: "10 Rue de la Prairie, 88100 Saint-Dié-des-Vosges",
      name: "La Cabane au Darou",
      description: "La Cabane au Darou : un lieu de brassage multiple , un bar atypique en plein centre ville",
      picture: "client/src/assets/PictPoi/darou.jpeg",
      rating: 4,
      categories: [bar, restaurant],
    },
    {
      city: SaintDié,
      latitude: 48.28923566188644,
      longitude: 6.950442702440239,
      address: "Rdpt des Combattants d'Afn et Téo, 88100 Saint-Dié-des-Vosges",
      name: "Cathédrale de Saint-Dié-des-Vosges",
      description: "L’origine de l’église de Saint-Dié-des-Vosges remonte à Saint Déodat (Dié ou Dieudonné), moine irlandais qui fonda au viie siècle la cité qui porte encore son nom. D'abord église abbatiale, elle devint la collégiale d’un chapitre de chanoines séculiers.",
      picture: "client/src/assets/PictPoi/tourDeLaLiberté.jpg",
      rating: 4,
      categories: [monument, parc],
    },
    // POI for Lille
    {
      city: lille,
      latitude: 50.63708377201713,
      longitude: 3.0634739415288417,
      address: "Colonne de la Déesse, Place du Général de Gaulle, Lille",
      name: "Colonne de la Déesse",
      description: "La plus belle colonne du monde",
      picture: "client/src/assets/PictPoi/colonnedelaDéesse.jpeg",
      rating: 5,
      categories: [monument, parc],
    },
    // POIs for Strasbourg
    {
      city: strasbourg,
      latitude: 48.58202057037567,
      longitude: 7.751055787174232,
      address: "Pl. de la Cathédrale, 67000 Strasbourg",
      name: "Cathédrale Notre-Dame de Strasbourg",
      description: "La plus belle cathédrale du monde",
      picture: "client/src/assets/PictPoi/cathédraleStrasbourg.jpeg",
      rating: 5,
      categories: [monument],
    },
    {
      city: strasbourg,
      latitude: 48.57986892625693,
      longitude: 7.738157546032719,
      address: "Pl. du Qur Blanc, 67000 Strasbourg",
      name: "Barrage Vauban",
      description: "Barrage et pont en grès rose construit au XVIIe siècle, abritant aujourd'hui des sculptures anciennes.",
      picture: "client/src/assets/PictPoi/barageVauban.jpeg",
      rating: 5,
      categories: [monument],
    },
    {
      city: strasbourg,
      latitude: 48.586883488648944,
      longitude:  7.734078804923648,
      address: "Pl. de la Gare, 67000 Strasbourg",
      name: "Gare de strasbourg",
      description: "Imposante gare du XIXe siècle à la façade moderne, avec services ferroviaires, restaurants et boutiques.",
      picture: "client/src/assets/PictPoi/gareStrasbourg.jpeg",
      rating: 5,
      categories: [monument],
    },
    {
      city: strasbourg,
      latitude: 48.58284763716674,
      longitude: 7.741152828909318,
      address: "10 Rue du 22 Novembre, 67000 Strasbourg",
      name: "Le Meteor",
      description: "Restaurant décontracté au style branché proposant des bières artisanales, du vin et des plats.",
      picture: "client/src/assets/PictPoi/meteor.jpeg",
      rating: 5,
      categories: [ bar ,restaurant ],
    },
    {
      city: strasbourg,
      latitude: 48.582453925571876,
      longitude: 7.737573497746059,
      address: "5 Rue du Faubourg-National, 67000 Strasbourg",
      name: "Le Petit Tigre",
      description: "Microbrasserie historique décorée dans un style clair et dotée d'une terrasse extérieure, proposant des repas simples.",
      picture: "client/src/assets/PictPoi/leTigre.jpeg",
      rating: 5,
      categories: [ bar ,restaurant ],
    },
    // POIs for Troyes
    {
      city: troyes,
      latitude: 48.29978058942174,
      longitude: 4.07700267026032,
      address: "Quai de Dampierre, 10000 Troyes",
      name: "Le Cœur de Troyes",
      description: "Le plus beau coeur du monde",
      picture: "client/src/assets/PictPoi/coeurDeTroye.jpeg",
      rating: 5,
      categories: [monument, restaurant],
    },
  ];

  for (const poiItem of poiData) {
    const poi = dataSource.getRepository(POI).create(poiItem);
    await dataSource.getRepository(POI).save(poi);
  }

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
    console.log(users);
    console.log(cities);
    console.log(categories);
};

void start();

