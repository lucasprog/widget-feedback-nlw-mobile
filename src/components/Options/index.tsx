import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles';

import { Copywright } from '../Copywright';
import { OptionItem } from '../OptionItem';

import { FeedbackType } from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void
}

export function Options({onFeedbackTypeChanged} : Props) {
  
  const feedBackTypesArray = Object.entries(feedbackTypes);
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Deixe seu feedback        
      </Text>

       <View style={styles.options}>
        {
          feedBackTypesArray.map(([key, value]) => (
            <OptionItem
              key={key}
              title={value.title}
              image={value.image}
              onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
            />
          ))
        }
      </View>

      <Copywright></Copywright>
    </View>
  );
}