import React, { useState } from 'react';
import { 
  View,
  TouchableOpacity,
  Image
 } from 'react-native';

import { styles } from './styles';

import { Camera, Trash } from 'phosphor-react-native';

import { theme } from '../../theme';


interface Props {
  screenshot: string | null;
  onTakeShot: () => void,
  onRemovedShot: () => void
}

export function ScreenshotButton({screenshot, onRemovedShot, onTakeShot} : Props) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={screenshot? onRemovedShot : onTakeShot}>
          {
            screenshot ? 
              <View>
                <Image 
                  style={styles.image}
                  source={{ uri: screenshot }}
                />

                  <Trash 
                  size={22}
                  color={theme.colors.text_secondary}
                  weight="fill"
                  style={styles.removeIcon}
                />

              </View>
            :
            <Camera 
              size={24}
              color={theme.colors.text_secondary}
              weight="bold"
            />
          }
      </TouchableOpacity>
    </View>
  );
}