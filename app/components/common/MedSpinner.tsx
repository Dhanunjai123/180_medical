import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageSourcePropType} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface MedicalSpinnerProps {
  size: number;
  //   images: Array<number | string>;
  duration?: number;
  //   color?: string;
}

const MedicalSpinner: React.FC<MedicalSpinnerProps> = ({
  size,
  //   color = '#000000',
  duration = 200,
}) => {
  const images: ImageSourcePropType[] = [
    require('../../assets/Logo/med2.png'),
    require('../../assets/Logo/hand.png'),
    // require('../../assets/Logo/med.png'),
    // Add more medical-related images here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentImage = images[currentIndex];

  //   const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <View style={styles.container}>
      {/* <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={duration}
        easing="ease-in-cubic"
        style={styles.spinnerContainer}
      >
         <Image source={randomImage} style={[styles.image, { tintColor: color }]} />
        {images.map((image, index) => (
          <Animatable.Image
            key={index}
            source={typeof image === 'number' ? image : {currentImage}}
            style={{ width: size, height: size }}
          />
        ))}
      </Animatable.View> */}

      <Animatable.View
        // animation="slideOutDown"
        animation="rotate"
        iterationCount="infinite"
        duration={duration}
        easing="linear"
        style={styles.spinnerContainer}>
        <Animatable.Image
          source={currentImage}
          style={{width: size, height: size}}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicalSpinner;
