// import React, { useState, useEffect } from "react";
// import ReactMic from "react-mic-gold";

// function VoiceRecorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedAudioChunks, setRecordedAudioChunks] = useState([]);
//   const [audioStream, setAudioStream] = useState(null);

//   const onStart = () => {
//     setIsRecording(true);
//   };

//   const onStop = (recordedData) => {
//     setRecordedAudioChunks((prevChunks) => [...prevChunks, recordedData.blob]);
//     setIsRecording(false);
//   };

//   useEffect(() => {
//     const audioContext = new AudioContext();
//     const analyser = audioContext.createAnalyser();
//     analyser.fftSize = 256;
//     analyser.smoothingTimeConstant = 0.3;

//     const getUserMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         setAudioStream(stream);

//         const audioSource = audioContext.createMediaStreamSource(stream);
//         audioSource.connect(analyser);

//         analyser.addEventListener("audioprocess", () => {
//           const dataArray = new Uint8Array(analyser.frequencyBinCount);
//           analyser.getByteFrequencyData(dataArray);

//           // Check for voice activity and start recording if detected
//           const isVoiceDetected = dataArray.some((value) => value > 128); // Adjust the threshold as needed

//           if (isVoiceDetected) {
//             if (!isRecording) {
//               onStart();
//             }
//           }
//         });
//       } catch (error) {
//         console.error("Error accessing microphone:", error);
//       }
//     };

//     getUserMedia();

//     return () => {
//       audioStream?.getTracks().forEach((track) => track.stop());
//     };
//   }, [isRecording, audioStream]);

//   const handleSave = () => {
//     if (recordedAudioChunks.length > 0) {
//       // Combine audio chunks into a single Blob
//       const combinedBlob = new Blob(recordedAudioChunks, {
//         type: "audio/wav",
//       });

//       // Save the combined audio to local storage
//       localStorage.setItem("recordedAudio", combinedBlob);
//     }
//   };

//   return (
//     <div>
//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={onStop}
//         strokeColor="#000000"
//         backgroundColor="#FF4081"
//       />
//       <button onClick={handleSave} disabled={!isRecording && recordedAudioChunks.length === 0}>
//         Save Recording
//       </button>
//     </div>
//   );
// }

// export default VoiceRecorder;
