import React, {useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import SignatureCapture, {
  SignatureCaptureRef,
} from 'react-native-signature-capture';
import Colors from '../../globals/colors';
import MedButton from './MedButton';

interface SignatureScreenProps {
  saveSignature?: (data: any) => void;
  resetSignature?: (data: any) => void;
}
const SignatureScreen: React.FC<SignatureScreenProps> = ({
  saveSignature,
  resetSignature,
}) => {
  const signatureRef = useRef<SignatureCaptureRef | null>(null);

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.saveImage();
    }
  };

  const handleResetSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.resetImage();
      resetSignature();
    }
  };

  const handleSignatureSaved = (result: any) => {
    const base64String = 'data:image/png;base64,' + result.encoded;
    saveSignature(base64String);
  };

  return (
    <View style={styles.container}>
      <SignatureCapture
        ref={signatureRef}
        style={styles.signature}
        onSaveEvent={handleSignatureSaved}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={'portrait'}
      />
      <View style={styles.buttonContainer}>
        <MedButton
          title="Save Signature"
          style={{backgroundColor: Colors.colorBlue}}
          onPress={handleSaveSignature}
        />
        <MedButton
          title="Reset Signature"
          style={{backgroundColor: Colors.colorBlue}}
          onPress={handleResetSignature}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    width: '100%',
    height: 300,
  },
  signature: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
});

export default SignatureScreen;
