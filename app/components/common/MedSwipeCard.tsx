import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';

interface SwiperComponentProps {
  data: {text: string}[]; // Replace { text: string }[] with the appropriate type for your data
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({data}) => {
  return (
    <View style={styles.swipperContainer}>
      <Swiper
        style={styles.wrapper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {data?.map((item, index) => (
          <View key={index} style={[styles.slideContent]}>
            <Text style={[styles.text]}>{item.text}</Text>
            <Image
              style={styles.notificationImage}
              source={require('../../assets/images/notification.png')}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  swipperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
  },
  wrapper: {},

  slideContent: {
    alignItems: 'center',
    backgroundColor: '#0D3644',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 110,
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
  },

  text: {
    color: '#fff',
    fontSize: 14,
    paddingRight: 10,
    width: '80%',
  },
  notificationImage: {
    height: 70,
    transform: [{scaleX: -1}],
  },
  dot: {
    backgroundColor: '#4d7b93',
    width: 5,
    height: 5,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#4d7b93',
    width: 40,
    height: 5,
    borderRadius: 10,
  },
});

export default SwiperComponent;
