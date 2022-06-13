import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';

import { ArrowLeft } from 'phosphor-react-native'

import { styles } from './styles';
import { theme } from '../../theme';

import { FeedbackType } from '../../components/Widget';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { Button } from '../../components/Button';

import { feedbackTypes } from '../../utils/feedbackTypes';

import * as FileSystem from 'expo-file-system';

import { api } from '../../libs/api';

interface Props {
  feedbackType : FeedbackType,
  onFeedbackCanceled: () => void,
  onFeedbackSent: () => void
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent} : Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot(){
    captureScreen({
      format: 'png',
      quality: 0.8
    })
      .then( (uri) => setScreenshot(uri) )
      .catch( (e) => console.log(e))
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if( isSendingFeedback ) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'});
    
    
    try{

      const formToSend = {
        type : feedbackType,
        screenshot: `data:image/png/;base64, ${screenshotBase64}`,
        comment
      };

      console.log('Form to Send --> ', formToSend)
      await api.post('/feedbacks', formToSend);

      onFeedbackSent();

    }catch(error)
    {
      console.log('error',error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image}
            style={styles.image}/>
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Digite aqui"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        />

        <View style={styles.footer} >
          <ScreenshotButton 
            onTakeShot={handleScreenshot}
            onRemovedShot={handleScreenshotRemove}
            screenshot={screenshot}
          />

          <Button  
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback} 
          />
        </View>
    </View>
  );
}