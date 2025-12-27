import React, { useState } from 'react';
import { FaEdit, FaCamera, FaCheckCircle, FaStar, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaLinkedin, FaGithub, FaUpload, FaSave } from 'react-icons/fa';

export default function FreelancerProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Sadik Ho',
    title: 'Développeur Full-Stack Senior',
    description: 'Développeur web full-stack avec 5 ans d\'expérience. Spécialisé en React, Node.js, et MongoDB. Passionné par la création de solutions innovantes et performantes.',
    email: 'sadik@example.com',
    phone: '+212 639 17 0000',
    location: 'Essaouira, Maroc',
    website: 'https://sadikho.dev',
    languages: ['Français', 'Anglais', 'Arabe'],
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
    experience: [
      { company: 'Tech Solutions', role: 'Lead Developer', period: '2022-Present' },
      { company: 'Digital Agency', role: 'Full-Stack Developer', period: '2020-2022' },
      { company: 'Startup XYZ', role: 'Frontend Developer', period: '2019-2020' }
    ],
    education: [
      { institution: 'Université Hassan II', degree: 'Master en Informatique', year: '2019' },
      { institution: 'École Supérieure de Technologie', degree: 'Licence en Développement Web', year: '2017' }
    ],
    social: {
      twitter: '@sadikho',
      linkedin: 'linkedin.com/in/sadikho',
      github: 'github.com/sadikho'
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleSave = () => {
    // Ici, normalement tu enverrais les données au backend
    setEditMode(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600 mt-2">Gérez votre profil public et vos informations personnelles</p>
          </div>
          <div className="flex space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <FaSave className="mr-2" />
                  Enregistrer
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <FaEdit className="mr-2" />
                Modifier le profil
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Photo et Stats */}
          <div className="lg:col-span-1">
            {/* Photo de profil */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="relative">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold mb-6">
                  SH
                </div>
                {editMode && (
                  <button className="absolute bottom-8 right-1/2 transform translate-x-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700">
                    <FaCamera />
                  </button>
                )}
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                <p className="text-gray-600">{profile.title}</p>
                
                {/* Badges */}
                <div className="flex justify-center space-x-2 mt-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaCheckCircle className="mr-1" />
                    Vérifié
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaStar className="mr-1" />
                    Top Rated
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Pro Seller
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Note moyenne</span>
                  <span className="font-bold text-gray-900">4.9/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commandes complétées</span>
                  <span className="font-bold text-gray-900">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de réponse</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temps de réponse</span>
                  <span className="font-bold text-gray-900">1h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membre depuis</span>
                  <span className="font-bold text-gray-900">Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center">
                  <FaGlobe className="text-gray-400 mr-3" />
                  <a href={profile.website} className="text-green-600 hover:text-green-700">
                    {profile.website}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Réseaux sociaux</h4>
                <div className="flex space-x-3">
                  <a href="#" className="text-blue-400 hover:text-blue-500">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-900">
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Informations détaillées */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">À propos de moi</h3>
                {editMode && <FaEdit className="text-gray-400 cursor-pointer" />}
              </div>
              {editMode ? (
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="4"
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                />
              ) : (
                <p className="text-gray-700">{profile.description}</p>
              )}
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Compétences</h3>
                {editMode && <FaEdit className="text-gray-400 cursor-pointer" />}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                    <span>{skill}</span>
                    {editMode && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ajouter une compétence"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>

            {/* Langues */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Langues</h3>
                {editMode && <FaEdit className="text-gray-400 cursor-pointer" />}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.languages.map((lang, index) => (
                  <div key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                    {lang}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="flex">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Ajouter une langue"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <button
                    onClick={addLanguage}
                    className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>

            {/* Expérience */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Expérience professionnelle</h3>
                {editMode && <FaEdit className="text-gray-400 cursor-pointer" />}
              </div>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-gray-900">{exp.role}</h4>
                      <span className="text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Éducation */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Éducation</h3>
                {editMode && <FaEdit className="text-gray-400 cursor-pointer" />}
              </div>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <span className="text-gray-600">{edu.year}</span>
                    </div>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio (optionnel) */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Conseils pour optimiser votre profil</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Ajoutez une photo professionnelle</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Décrivez clairement vos services</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Ajoutez vos certifications</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Mettez à jour régulièrement votre portfolio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}