import backgroundImage from "../assets/europeMap.png";
import { Link } from "react-router-dom";
import { Text, View, Image, Button } from "react-native";

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ flex: 1, width: "100%", resizeMode: "cover" }}
        source={{ backgroundImage }}
      />
      <View className="hero-overlay "></View>
      <View className="hero-content text-center text-neutral-content">
        <View className="max-w-2-xl text-base-content">
          <Text className="mb-5 text-5xl font-bold">City Guide</Text>
          <Text className="mb-5">
            Parcourir une ville comme un local. Aller droit au but. <br />
            Découvrir des perles rares.
          </Text>
          <Link to="/cities">
            <Button className="btn btn-primary">Explorez maintenant !</Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default Home;
