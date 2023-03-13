import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, TextInput, Pressable } from 'react-native';
import styles from './styles';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated';

export default function App() {
  const {height, width} = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [-height/2, 0])
    return{
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
    return{
      opacity: withTiming(imagePosition.value, {duration:500}),
      transform:[{translateY: withTiming(interpolation, {duration: 1000})}]
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [180,360])
      return{
        opacity: withTiming(imagePosition.value === 1 ? 0:1, {duration:800} ),
        transform:[{rotate: withTiming(interpolation + "deg", {duration: 1000})}]
      };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: 
          imagePosition.value === 0 
            ? withDelay(400, withTiming(1, {duration:800})) 
            : withTiming(0,{duration:300})
      };
  });

  // const formButtonAnimatedStyle = useAnimatedStyle(() => {

  // });

  const loginHandler = () => {
    imagePosition.value = 0
    if (isRegistering) {
      setIsRegistering(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0
    if (!isRegistering) {
      setIsRegistering(true);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height +100}/>
          </ClipPath>
          <Image 
            href={require('./assets/background.jpg')} 
            width={width + 100} 
            height={height  + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath='url(#clipPathId)'
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
        <TouchableOpacity onPress={() => imagePosition.value = 1}>
          <Text>X</Text>
        </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput 
            placeholder="Email" 
            placeholderTextColor="black"
            style={styles.textinput}
          />

          {isRegistering && (
            <TextInput 
            placeholder="Full Name" 
            placeholderTextColor="black"
            style={styles.textinput}
            />
          )}

          

          <TextInput 
            placeholder="Password" 
            placeholderTextColor="black"
            style={styles.textinput}
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>{isRegistering ? 'REGISTER': 'LOG IN'}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
