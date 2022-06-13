import React, { useRef } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps } from 'react-native'

import { styles } from './styles';
import { theme } from '../../theme';

interface Props extends TouchableOpacityProps {
  title : string;
  image: ImageProps;
}

export function OptionItem({title, image,...rest} : Props) {
  return (
    <TouchableOpacity
    style={styles.container}
    {...rest}>
      <Image 
        source={image}
        style={styles.image}
        />

        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}