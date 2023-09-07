import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const GymFeeCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [monthlyFee, setMonthlyFee] = useState('');
  const [yearlyFee, setYearlyFee] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSave = () => {
    // Handle saving the updated fees here
    // You can access the updated values in the monthlyFee and yearlyFee states
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.gymFeeText}>Gym fees</Text>
        </View>
        <TouchableOpacity style={styles.pencilicon} onPress={toggleModal}>
          <FontAwesome name="pencil" color={'#fff'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.splitBox}>
          <Text style={styles.feeLabel}>Monthly</Text>
          <Text style={styles.feeAmount}>₹600</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.splitBox}>
          <Text style={styles.feeLabel}>Yearly</Text>
          <Text style={styles.feeAmount}>₹6200</Text>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        backdropOpacity={0.3}
        backdropTransitionOutTiming={0}
        onBackdropPress={toggleModal}>
        <View style={styles.overlay} />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Fees</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monthly Fee</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter monthly fee"
              placeholderTextColor="#A6A6AA"
              value={monthlyFee}
              keyboardType="phone-pad"
              onChangeText={text => setMonthlyFee(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Yearly Fee</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A6A6AA"
              placeholder="Enter yearly fee"
              value={yearlyFee}
              keyboardType="phone-pad"
              onChangeText={text => setYearlyFee(text)}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Update Fee</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA500',
    height: 180, // Fixed height in pixels
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: 20, // Fixed marginTop in pixels
    padding: 10, // Fixed padding in pixels
  },
  header: {
    backgroundColor: 'orange',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  headerContent: {
    flex: 1,
  },
  card: {
    height: 100,
    width: '80%', // Use 100% width for the card
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    marginTop: 8.5, // Fixed marginTop in pixels
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  splitBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: 'gray',
    height: 50,
    alignSelf: 'center',
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  feeAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  gymFeeText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  pencilicon: {
    paddingRight: 10,
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    width: '100%', // Use 100% width for the overlay
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: '50%',
    marginTop: '5%', // Fixed marginTop in pixels
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#454545',
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '5%', // Fixed marginTop in pixels
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GymFeeCard;
