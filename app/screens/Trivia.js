import React, { useState,useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { COLORS, SIZES } from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
const Separator = () => <View style={styles.separator} />;

const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [finishTimer, setFinishTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // Inicialmente 60 segundos
    const [key, setKey] = useState(0); // Clave para forzar re-render

  
    const handlePress = () => {
      setTimeLeft(prevTimeLeft => prevTimeLeft + 10); // Sumar 10 segundos al tiempo restante
      setKey(prevKey => prevKey + 1); // Cambiar la clave para forzar re-render
    };

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // se suman puntos
            setScore(score+1);
            handlePress();
        }
        // Se muestra boton de siguiente
        setShowNextButton(true)
    }

    const handleNext =() => {
        if(currentQuestionIndex== allQuestions.length-1){
            //UltimaPregunta
            //MostrarTablaDePuntos
            setShowScoreModal(true);
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }
    const restartQuiz =() => {
        setShowScoreModal(false);
        setFinishTimer(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }


    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 10
            
            }}>
                {/* Contador de preguntas*/}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',

                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight:2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/{allQuestions.length}</Text>
                </View>
                {/*Preguntas */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 24
                }}>{allQuestions[currentQuestionIndex]?.question}
                </Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: COLORS.secondary+"20",
                            backgroundColor: option==correctOption 
                            ? COLORS.success +"20"
                            : option== currentOptionSelected 
                            ? COLORS.error +"20"
                            : COLORS.secondary+"20",
                            backgroudColor: COLORS.secondary+"20",
                            height: 60, borderRadius: 20,
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* MOSTRAR ICONO DE CORRECTO O ERRONEO DE RESPUESTA*/}
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center',

                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option==currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center',

                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity 
                onPress={handleNext}
                style={{
                    marginTop: 10,
                    width: '100%',
                    backgroundColor: COLORS.accent,
                    padding: 10,
                    borderRadius: 5
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: COLORS.white,
                        textAlign: 'center',
                    }}>Siguiente</Text>
                </TouchableOpacity>
                
            )
    }else{
        return null
        }
    }
    const [progress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>
                </Animated.View>
            </View>
        )
    }

    const showResults = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={showScoreModal}
                >
                    <View style={{
                        flex:1,
                        backgroudColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroudColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize: 30, fontWeight: "bold", textAlign:'center'}}>{  score> (allQuestions.length/2) ? 'Felicidades' : 'Que mal!' }</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                 <Text style={{
                                    fontSize: 20, color: COLORS.black
                                 }}>/ { allQuestions.length }</Text>
                            </View>
                            {/* INTENTAR DE NUEVO */}
                            <TouchableOpacity
                            onPress={restartQuiz}
                            style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                            }}>
                                <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Intentar de nuevo</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
        )
    }

    const renderFinishTimer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={finishTimer}
                >
                    <View style={{
                        flex:1,
                        backgroudColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroudColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize: 24, fontWeight: "bold", textAlign:'center'}}>{  score> (allQuestions.length/2) ? 'Se ha acabado el tiempo! Felicidades por su resultado' : 'Se ha acabado el tiempo! Su resultado fue' }</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                 <Text style={{
                                    fontSize: 20, color: COLORS.black
                                 }}>/ { allQuestions.length }</Text>
                            </View>
                            {/* INTENTAR DE NUEVO */}
                            <TouchableOpacity
                            onPress={restartQuiz}
                            style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                            }}>
                                <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Intentar de nuevo</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
        )
    }
    
    const renderTimer= () => {
        return (   
            <View>
                <Separator />
                <CountDown
                key={key}
                until={timeLeft}
                size={26}
                running={true}
                onFinish={() => setFinishTimer(true)}
                digitStyle={{backgroundColor: COLORS.secondary+'20', borderWidth: 3, borderColor: COLORS.secondary+'20'}}
                digitTxtStyle={{color: '#fff'}}
                timeLabelStyle={{color: 'white', fontWeight: 'bold'}}
                separatorStyle={{color: COLORS.secondary+'20'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: '', s: ''}}
                />
            </View>
            
        )
    }


    return (
        <SafeAreaView style={{
                flex: 1
            }}>
            <StatusBar barStyle="light-content" backgroudColor={COLORS.primary}/>
            <View style={{
                flex:1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                {/* BARRA DE PROGRESO */}
                { renderProgressBar() }

                {/* PREGUNTAS */}
                {renderQuestion()}

                {/* OPCIONES */}
                {renderOptions()}

                {/* SIGUIENTE BOTON */}
                {renderNextButton()}

                {/* TIMER */}
                {renderTimer()}
                {renderFinishTimer()}

                {/* Tabla de puntos */}
                {showResults()}
                         


            </View>
        </SafeAreaView>
    )             
}
const styles = StyleSheet.create({
    separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    },
    parentView: {
        flex:1,
    }
    });
export default Quiz
