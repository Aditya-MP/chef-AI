import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CameraViewfinder from './components/CameraViewfinder';
import CameraControls from './components/CameraControls';
import DetectionOverlay from './components/DetectionOverlay';
import DetectedIngredientsSheet from './components/DetectedIngredientsSheet';
import ProcessingIndicator from './components/ProcessingIndicator';
import CameraHelperTips from './components/CameraHelperTips';
import IngredientRecognitionService from '../../services/ingredientRecognitionService';
import Icon from '../../components/AppIcon';


const IngredientRecognitionCameraInterface = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Camera state
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');

  // Detection state
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [showDetectionSheet, setShowDetectionSheet] = useState(false);
  const [error, setError] = useState(null);

  // Helper state
  const [showHelperTips, setShowHelperTips] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Initialize camera on component mount
  useEffect(() => {
    initializeCamera();
    return () => {
      cleanup();
    };
  }, [facingMode]);

  const initializeCamera = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Camera not supported on this device/browser');
        setHasPermission(false);
        return;
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 16/9
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
        setHasPermission(true);
        setError(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      setIsStreaming(false);
      setError('Camera access denied or not available');
    }
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  const handleCameraFlip = () => {
    cleanup();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const handleFlashToggle = () => {
    if (stream) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if (capabilities.torch) {
        track.applyConstraints({
          advanced: [{ torch: !flashEnabled }]
        }).then(() => {
          setFlashEnabled(!flashEnabled);
        }).catch(console.error);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCapturedImage(e.target.result);
          processImageWithGemini(e.target.result, file.type);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
        setError('Failed to read image file');
      }
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageDataUrl);

    // Process the captured image with Gemini AI
    processImageWithGemini(imageDataUrl, 'image/jpeg');
  }, []);

  const processImageWithGemini = async (imageData, mimeType) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setBoundingBoxes([]);
    setError(null);

    try {
      // Simulate processing steps
      const steps = [
        { step: 'Preparing image...', progress: 20 },
        { step: 'Connecting to Gemini AI...', progress: 40 },
        { step: 'Analyzing image content...', progress: 60 },
        { step: 'Identifying ingredients...', progress: 80 },
        { step: 'Finalizing results...', progress: 90 }
      ];

      for (const { step, progress } of steps) {
        setProcessingStep(step);
        setProcessingProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Process with Gemini AI
      const detectedItems = await IngredientRecognitionService.recognizeIngredients(imageData, mimeType);
      
      // Create bounding boxes from detection results
      const boxes = detectedItems.map((ingredient, index) => ({
        id: `detection-${ingredient.id}`,
        x: ingredient.boundingBox?.x || Math.random() * 0.6 + 0.1,
        y: ingredient.boundingBox?.y || Math.random() * 0.6 + 0.1,
        width: ingredient.boundingBox?.width || Math.random() * 0.2 + 0.15,
        height: ingredient.boundingBox?.height || Math.random() * 0.2 + 0.15,
        ingredient: ingredient,
        confidence: ingredient.confidence
      }));

      setBoundingBoxes(boxes);
      setDetectedIngredients(detectedItems);
      setShowDetectionSheet(true);
      setProcessingProgress(100);

    } catch (error) {
      console.error('Error processing image with Gemini:', error);
      setError('Failed to analyze image. Please check your API key and try again.');
      
      // Show fallback mock data
      const fallbackIngredients = IngredientRecognitionService.getMockIngredientDetection();
      setDetectedIngredients(fallbackIngredients);
      setShowDetectionSheet(true);
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingStep('');
    }
  };

  const handleIngredientConfirm = (ingredients) => {
    // Navigate back to dashboard with detected ingredients
    const ingredientParams = ingredients.map(ing => ing.name).join(',');
    navigate(`/main-dashboard-with-dual-panel-layout?detected=${encodeURIComponent(ingredientParams)}`);
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGalleryAccess = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Hidden file input for gallery access */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hidden canvas for photo capture */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Camera Viewfinder */}
      <CameraViewfinder
        videoRef={videoRef}
        isStreaming={isStreaming}
        hasPermission={hasPermission}
        capturedImage={capturedImage}
        error={error}
        onRetake={() => {
          setCapturedImage(null);
          setError(null);
          setBoundingBoxes([]);
          setShowDetectionSheet(false);
        }}
        onFileUpload={handleFileUpload}
      />

      {/* Detection Overlay */}
      {isStreaming && boundingBoxes.length > 0 && (
        <DetectionOverlay
          boundingBoxes={boundingBoxes}
          videoRef={videoRef}
        />
      )}

      {/* Camera Controls */}
      <CameraControls
        onCapture={capturePhoto}
        onFlashToggle={handleFlashToggle}
        onCameraFlip={handleCameraFlip}
        onGalleryAccess={handleGalleryAccess}
        onClose={handleClose}
        onShowTips={() => setShowHelperTips(true)}
        flashEnabled={flashEnabled}
        isProcessing={isProcessing}
        hasCamera={isStreaming}
      />

      {/* Processing Indicator */}
      {isProcessing && (
        <ProcessingIndicator
          progress={processingProgress}
          step={processingStep}
        />
      )}

      {/* Helper Tips Modal */}
      {showHelperTips && (
        <CameraHelperTips
          onClose={() => setShowHelperTips(false)}
        />
      )}

      {/* Error Display */}
      {error && !isProcessing && (
        <div className="absolute top-4 left-4 right-4 z-40">
          <div className="bg-error/90 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Detected Ingredients Bottom Sheet */}
      {showDetectionSheet && detectedIngredients.length > 0 && (
        <DetectedIngredientsSheet
          ingredients={detectedIngredients}
          onConfirm={handleIngredientConfirm}
          onClose={() => setShowDetectionSheet(false)}
          onEditIngredient={(id, newName) => {
            setDetectedIngredients(prev =>
              prev.map(ing => ing.id === id ? { ...ing, name: newName } : ing)
            );
          }}
          onRemoveIngredient={(id) => {
            setDetectedIngredients(prev => prev.filter(ing => ing.id !== id));
            setBoundingBoxes(prev => prev.filter(box => box.ingredient.id !== id));
          }}
          isAiGenerated={true}
        />
      )}
    </div>
  );
};

export default IngredientRecognitionCameraInterface;