import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'cart-icon': {
    width: [{ unit: 'px', value: 45 }],
    height: [{ unit: 'px', value: 45 }],
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  'cart-icon shopping-icon': {
    width: [{ unit: 'px', value: 24 }],
    height: [{ unit: 'px', value: 24 }]
  },
  'cart-icon item-count': {
    position: 'absolute',
    fontSize: [{ unit: 'px', value: 10 }],
    fontWeight: 'bold',
    bottom: [{ unit: 'px', value: 12 }]
  }
});
