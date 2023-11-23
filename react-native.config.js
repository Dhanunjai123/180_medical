// module.exports = {
//     project: {
//         ios:{},
//         android:{}
//     },
//     assets:['./assets/fonts/'],
// }

module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    assets: [".app/assets/fonts/"], // stays the same
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
  };