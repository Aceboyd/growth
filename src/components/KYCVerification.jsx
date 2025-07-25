import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dunqe09gc/image/upload';
const UPLOAD_PRESET = 'jayjay';
const API_BASE_URL = 'https://growthsphere.onrender.com';

const StatusCard = ({ icon, color, title, message }) => (
  <div className="max-w-xl mx-auto text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
    <div className={`w-16 h-16 mx-auto mb-4 ${color} rounded-full flex items-center justify-center`}>
      {icon}
    </div>
    <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-300 text-sm mb-4">{message}</p>
  </div>
);

const KYCVerification = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    idType: 'passport',
    idFront: null,
    idBack: null,
    idFrontUrl: '',
    idBackUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAccessToken = () => localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUserStatus = async () => {
      setLoading(true);
      const token = getAccessToken();
      if (!token) {
        console.warn('No access token found, redirecting to signin');
        navigate('/signin');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched user data on mount:', response.data);
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user status:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/signin');
        } else {
          // Fallback to prevent form from showing on fetch failure
          setUser((prev) => ({ ...prev, status: 'error' }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [navigate, setUser]);

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_URL, data);
      const fileUrl = res.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
        [`${name}Url`]: fileUrl,
      }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload file.');
    }
  };

  const handleSubmit = async () => {
    if (!formData.idFrontUrl || !formData.idBackUrl) {
      return alert('Please upload both front and back of your ID.');
    }

    setSubmitting(true);
    try {
      const token = getAccessToken();
      if (!token) {
        alert('Please log in to submit KYC documents.');
        navigate('/signin');
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/auth/kyc-upload/`,
        {
          id_type: formData.idType,
          id_front_url: formData.idFrontUrl,
          id_back_url: formData.idBackUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set status to in_review immediately
      setUser((prev) => ({ ...prev, status: 'in_review' }));

      // Reset form data
      setFormData({
        idType: 'passport',
        idFront: null,
        idBack: null,
        idFrontUrl: '',
        idBackUrl: '',
      });
    } catch (err) {
      console.error('KYC submission error:', err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Failed to submit KYC documents. Please try again or contact support.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  console.log('Current user status:', user.status); // Debug user status

  if (user.status === 'verified' || user.status === 'approved') {
    return (
      <StatusCard
        icon={<CheckCircle className="w-8 h-8 text-green-400" />}
        color="bg-green-500/20"
        title="KYC Verified"
        message="Your identity has been successfully verified. You now have full access to the platform."
      />
    );
  }

  if (user.status === 'rejected') {
    return (
      <StatusCard
        icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
        color="bg-red-500/20"
        title="KYC Rejected"
        message="Your verification was rejected. Please re-submit your documents or contact support."
      />
    );
  }

  if (user.status === 'pending' || user.status === 'in_review') {
    return (
      <StatusCard
        icon={<Clock className="w-8 h-8 text-blue-400" />}
        color="bg-blue-500/20"
        title="KYC In Review"
        message="Your documents are under further review. We’ll notify you with an update soon."
      />
    );
  }

  if (user.status === 'error') {
    return (
      <StatusCard
        icon={<AlertTriangle className="w-8 h-8 text-yellow-400" />}
        color="bg-yellow-500/20"
        title="Error"
        message="Unable to load KYC status. Please try again or contact support."
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-white text-2xl font-bold mb-6">KYC Verification</h2>
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Document Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={(e) => setFormData((prev) => ({ ...prev, idType: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
        >
          <option value="passport">Passport</option>
          <option value="drivers_license">Driver’s License</option>
          <option value="national_id">National ID</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Front of ID</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-300 text-xs mb-2">Upload front of your ID</p>
            <input
              type="file"
              name="idFront"
              onChange={handleFileUpload}
              className="hidden"
              id="idFront"
              accept="image/*"
            />
            <label
              htmlFor="idFront"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
            >
              Choose File
            </label>
            {formData.idFront && (
              <p className="text-green-400 text-xs mt-2">{formData.idFront.name}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Back of ID</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-300 text-xs mb-2">Upload back of your ID</p>
            <input
              type="file"
              name="idBack"
              onChange={handleFileUpload}
              className="hidden"
              id="idBack"
              accept="image/*"
            />
            <label
              htmlFor="idBack"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
            >
              Choose File
            </label>
            {formData.idBack && (
              <p className="text-green-400 text-xs mt-2">{formData.idBack.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </div>
    </div>
  );
};

export default KYCVerification;