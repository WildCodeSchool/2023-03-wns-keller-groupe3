import { View, Text } from "react-native";
import * as Svg from "react-native-svg";

interface CustomeToastProps {
  message: string;
  color: string;
}

export default function CustomToast({ message, color }: CustomeToastProps) {
  return (
    <View className="flex items-center">
      <Svg
        xmlns="http://www.w3.org/2000/Svg"
        fill="none"
        viewBox="0 0 30 30"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-7 h-7 ${color}`}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </Svg>
      <Text className="ml-2">{message}</Text>
    </View>
  );
}
