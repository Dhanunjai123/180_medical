/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import Styles from '../../../styles';
import MedButton from './MedButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Colors from '../../globals/colors';
import {StackParams} from '../../../App';
import {RootStackParamList} from '../pages/BottomTabs';
import Moment from 'moment';
import RNFS from 'react-native-fs'; // To parse the base64 to pdf and download the file
import DocumentService from '../../api/services/Document';
import Constants from '../../globals/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {convertAbsoluteToRem} from 'native-base/lib/typescript/theme/tools';
import Icon from 'react-native-vector-icons/Ionicons';

interface MedExpandProps {
  value: any[];
  isExpand: boolean;
  newPage: string;
  onData?: (data: any) => void;
  onNotification?: (data: any) => void;
  pageNumber?: any;
  PageCount?: any;
  pageTotal?: any;
}

const MedExpandableList: React.FC<MedExpandProps> = ({
  value,
  isExpand,
  newPage,
  onData,
  onNotification,
  pageNumber,
  PageCount,
  pageTotal,
}) => {
  const [selectedId, setSelectedId] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [spinner, setSpinner] = useState(false);
  // const navigation = useNavigation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [reachedEnd, setReachedEnd] = useState(false);
  const [page, setPage] = useState(0);
  const isTablet = width > 600;
  // if (newPage == 'message'){
  //   setPage(pageNumber);
  // }
  const _format = 'MM/DD/YYYY';
  useEffect(() => {
    //Get device Height
    setHeight(Dimensions.get('window').height);
    //Get device Width
    setWidth(Dimensions.get('window').width);
  }, []);

  const dataExpand = (itemId: any) => {
    // setSelectedId(item.orderId)
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderChildItem = (childItem: any) => {
    return (
      <View style={[Styles.expandableCard, Styles.lineHorizontal]}>
        <Text style={[Styles.flatText, Styles.fontBold]}>
          Product: {childItem.productNumber ? childItem.productNumber : 'N/A'}{' '}
          &emsp; Units: {childItem.units}
        </Text>
        <Text style={[Styles.lh4, Styles.flatSubTitle]}>
          {childItem.description}
        </Text>
      </View>
    );
  };

  const renderExpandableListItem = (item: any) => {
    const expand = expandedItems[item.orderId] ? true : false;
    return (
      <View>
        <TouchableOpacity
          style={[Styles.flatCard]}
          key={item.orderId}
          // onPress={() => isExpand? setSelectedId(item.orderId) : ''}
          onPress={() => (isExpand ? dataExpand(item.orderId) : '')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 5,
              alignItems: 'center',
            }}>
            <Text style={Styles.flatTitle}>
              {item.orderMessage}{' '}
              {/* {item.confOrderId == 0 ? '' : item.confOrderId} */}
            </Text>
            {item.needsConfirmation && !item.hasChangeRequest && (
              <MaterialCommunityIcons
                name="alert-circle"
                color={Colors.red}
                size={18}
              />
            )}
          </View>
          <View style={Styles.flatListLayout}>
            <View style={{width: '70%'}}>
              <View style={Styles.flatSubTitle}>
                <Text style={Styles.flatText}>
                  <Text style={Styles.fontBold}>Order:</Text> #{item.orderId}{' '}
                  &emsp;{' '}
                </Text>
              </View>
              <View>
                <Text style={Styles.flatText}>{item.addressLine1}</Text>
                <Text style={Styles.flatText}>
                  {item.city}
                  <Text>,</Text> {item.stateAbbreviation} {item.zip}
                </Text>

                {!expand ? (
                  <View>
                    <Text style={Styles.flatText}>
                      <Icon
                        name="chevron-forward-outline"
                        size={isTablet ? 23 : 18}
                        style={{color: '#2f6d9c'}}
                      />
                      <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                        Show
                      </Text>{' '}
                      <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                        {item?.items?.length}{' '}
                      </Text>
                      {item.items?.length == 1 ? (
                        <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                          Item
                        </Text>
                      ) : (
                        <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                          Items
                        </Text>
                      )}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={Styles.flatText}>
                      <Icon
                        name="chevron-down-outline"
                        size={isTablet ? 23 : 18}
                        style={{color: '#2f6d9c'}}
                      />
                      <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                        Show
                      </Text>{' '}
                      <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                        {item?.items?.length}{' '}
                      </Text>
                      {item.items?.length == 1 ? (
                        <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                          Item
                        </Text>
                      ) : (
                        <Text style={[Styles.fontBold, {color: '#2f6d9c'}]}>
                          Items
                        </Text>
                      )}
                    </Text>
                  </View>
                )}
                {/* <Text style={[Styles.linkTextBlue]}>See More...</Text> */}
              </View>

              {item.isUpcoming &&
                !item.isPastCutoff &&
                !item.isSampleOrWaiverOrder &&
                !item.hasChangeRequest && (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('OrderChangeScreen', {
                          orderId: item.orderId,
                        });
                      }}>
                      <Text style={[Styles.flatText, {color: Colors.linkBlue}]}>
                        Request changes to my upcoming order
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>

            {item.trackingNumbers?.length ? (
              <View
                style={{
                  backgroundColor: '#e2e2fb',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 25,
                }}>
                {/* <MedButton title="Anto" /> */}
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(item.trackingNumbers[0].trackingNumberUrl);
                  }}>
                  <MaterialCommunityIcons
                    name="truck-fast-outline"
                    color={'black'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {item.needsConfirmation && !item.hasChangeRequest && (
                  <MedButton
                    title="Confirm"
                    // onPress={(e) => handleConfimBtnClick(item.confOrderId)}
                    onPress={() =>
                      navigation.push('OrderDetailScreen', {
                        confOrderId: item.confOrderId,
                      })
                    }
                  />
                )}
              </View>
            )}
          </View>

          {expand && (
            <FlatList
              data={item.items}
              keyExtractor={child => String(child.orderItemId)}
              // keyExtractor={child => child.orderId}
              renderItem={({item: childItem}) => renderChildItem(childItem)}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // Logic to increment page by scroll in Flat list
  const renderFooter = () => {
    if (pageNumber >= PageCount)
      return (
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            width: '90%',
            height: 38,
            borderWidth: 1,
            borderColor: '#E4E4E4',
            borderRadius: 7,
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#0E0F11',
              // fontFamily: 'F37Neuro-Regular',
            }}>
            {pageTotal} out of {pageTotal} Messages
          </Text>
        </View>
      );
  };

  const handleLoadMore = () => {
    // setPage(pageNumber);
    // if (reachedEnd) {
    if (pageNumber < PageCount) {
      pageNumber = pageNumber + 1;
      onData(pageNumber);
      // }
    }
  };

  const notificationClick = (item: any) => {
    onNotification(item);
  };

  const renderList = (item: any) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => notificationClick(item)}
          style={[Styles.flatCard]}
          key={item.emailQueueId}>
          <View style={Styles.flatListLayout}>
            {item.isRead ? (
              <View style={{width: '80%'}}>
                <Text style={[Styles.flatSubTitle, {color: 'black'}]}>
                  {item.emailSubject}
                </Text>
                <Text style={Styles.flatText}>
                  {Moment(item.emailSentDate).format(_format)}
                </Text>
              </View>
            ) : (
              <View style={{width: '80%'}}>
                <Text
                  style={[
                    Styles.flatSubTitle,
                    {color: 'black', fontWeight: '900'},
                  ]}>
                  {item.emailSubject}
                </Text>
                <Text style={[Styles.flatText, {fontWeight: '900'}]}>
                  {Moment(item.emailSentDate).format(_format)}
                </Text>
              </View>
            )}
            <View
              style={{
                backgroundColor: Colors.messagePurple,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 25,
              }}>
              <TouchableOpacity onPress={() => notificationClick(item)}>
                <Text style={{fontWeight: '600', color: Colors.black}}>
                  View
                </Text>
                {/* <MaterialCommunityIcons name="eye" color={'black'} size={25} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // To render document list
  const renderListItem = (item: any) => {
    return (
      <View>
        <TouchableOpacity style={[Styles.flatCard]} key={item.emailQueueId}>
          <View style={Styles.flatListLayout}>
            <View style={[Styles.flexColumn, {width: '80%'}]}>
              <Text style={[Styles.flatSubTitle, {color: 'black'}]}>
                {item.documentName}
              </Text>
              <Text style={Styles.flatText}>{item.documentType}</Text>
              <Text style={Styles.flatText}>
                {Moment(item.receivedDate).format(_format)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.messagePurple,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 25,
              }}>
              <TouchableOpacity
                onPress={() =>
                  downloadFile(item.filePath, item.documentName, item)
                }>
                <MaterialCommunityIcons
                  name="file-download"
                  color={'black'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Get document by documentId to get document key for downloading file
  const downloadFile = (fileUrl: any, fileName: string, item: any) => {
    setSpinner(true);
    DocumentService.getDocumentById(item.documentId)
      .then(async response => {
        if (response.status == 200) {
          const pdfPath = await base64ToPDF(response.data.document, fileName);
          if (pdfPath) {
            await downloadPDF(pdfPath, fileName);
          }
        }
      })
      .catch(error => {
        setTimeout(() => {
          setSpinner(false);
          Alert.alert('Alert', error.message, [{text: Constants.OK_TEXT}]);
        }, 100);
      });
  };

  // To convert base64 into downloadable file
  const base64ToPDF = async (base64String: string, fileName: string) => {
    const {
      DocumentDirectoryPath,
      ExternalDirectoryPath,
      DownloadDirectoryPath,
    } = RNFS;

    // const fileName = 'example.pdf'; // Change this to the desired file name

    try {
      let path = '';
      if (Platform.OS == 'android') {
        path = `${DownloadDirectoryPath}/${fileName}`;
      } else {
        path = `${DocumentDirectoryPath}/${fileName}`;
      }

      await RNFS.writeFile(path, base64String, 'base64');
      return path;
    } catch (error) {
      console.error('Error writing PDF file:', error);
      return null;
    }
  };

  // To download convertd base64 into a mobile storage
  const downloadPDF = async (pdfPath: string, fileName: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    try {
      if (Platform.OS == 'ios') {
        const destinationFolder = `${RNFS.DocumentDirectoryPath}`;
        await RNFS.mkdir(destinationFolder); // Create the destination folder if it doesn't exist

        await RNFS.moveFile(
          pdfPath,
          `${destinationFolder}/${fileName}_${formattedDate}`,
        );
      } else {
        const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}_${formattedDate}`; // Change this to the desired file name
        await RNFS.moveFile(pdfPath, downloadDest);
      }
      // Use the file in `downloadDest` to display or share as needed
      setTimeout(() => {
        setSpinner(false);
        Alert.alert(
          Constants.DOCUMENT_TEXT,
          'PDF downloaded successfully, please check your downloads.',
          [
            {
              text: Constants.OK_TEXT,
            },
          ],
        );
      }, 100);
    } catch (error) {
      console.error('Error downloading PDF file:', error);
    }
  };

  return (
    <View>
      {/* <Spinner visible={spinner} /> */}
      {newPage === 'message' ? (
        <FlatList
          data={value}
          keyExtractor={item => String(item.emailQueueId)}
          renderItem={({item}) => renderList(item)}
          // onScroll={handleScroll}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.2} // Adjust this threshold as needed
        />
      ) : newPage === 'order' ? (
        <FlatList
          data={value}
          keyExtractor={item => item.orderId.toString()}
          renderItem={({item}) => renderExpandableListItem(item)}
        />
      ) : (
        <FlatList
          data={value}
          keyExtractor={item => item.documentId.toString()}
          renderItem={({item}) => renderListItem(item)}
        />
      )}
    </View>
  );
};

export default MedExpandableList;
