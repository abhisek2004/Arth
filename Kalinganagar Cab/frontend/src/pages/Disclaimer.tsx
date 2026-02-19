import React from 'react';
import { AlertTriangle, Code, Coffee, Heart, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Disclaimer & Acknowledgement</h1>
            <p className="text-xl opacity-90">Important information about this project</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Developer Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">👨‍💻 Website Creator</h2>
            <h3 className="text-3xl font-bold text-yellow-300">Abhisek Panda</h3>
            <p className="text-lg opacity-90">Full-Stack Developer & MERN Stack Enthusiast</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a
              href="https://abhisekpanda072.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-all"
            >
              <Globe className="h-6 w-6 mx-auto mb-2" />
              <p className="font-semibold">Portfolio</p>
              <p className="text-sm opacity-80">View Projects</p>
            </a>
            
            <a
              href="https://github.com/abhisek2004"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-all"
            >
              <Github className="h-6 w-6 mx-auto mb-2" />
              <p className="font-semibold">GitHub</p>
              <p className="text-sm opacity-80">Source Code</p>
            </a>
            
            <a
              href="https://www.linkedin.com/in/abhisekpanda2004/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-all"
            >
              <Linkedin className="h-6 w-6 mx-auto mb-2" />
              <p className="font-semibold">LinkedIn</p>
              <p className="text-sm opacity-80">Connect</p>
            </a>
          </div>
          
          <div className="text-center">
            <p className="flex items-center justify-center space-x-2 text-lg">
              <span>This project = </span>
              <Code className="h-5 w-5" />
              <span>Code +</span>
              <Coffee className="h-5 w-5" />
              <span>Coffee +</span>
              <Heart className="h-5 w-5 text-red-300" />
              <span>Curiosity</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Important Notice */}
          <section>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">🚧 Important Note</h3>
                  <p className="text-red-700 leading-relaxed">
                    This website has been developed as a <strong>personal learning project</strong> to sharpen my skills 
                    in full-stack web development — specifically using the <strong>MERN stack</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* MERN Stack Info */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h3 className="font-semibold text-green-800">MongoDB</h3>
                <p className="text-sm text-green-600">Database</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <h3 className="font-semibold text-yellow-800">Express.js</h3>
                <p className="text-sm text-yellow-600">Backend</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <h3 className="font-semibold text-blue-800">React.js</h3>
                <p className="text-sm text-blue-600">Frontend</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <h3 className="font-semibold text-purple-800">Node.js</h3>
                <p className="text-sm text-purple-600">Runtime</p>
              </div>
            </div>
          </section>

          {/* Project Purpose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Purpose of this Project</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                This is <strong>not an official website</strong> of any organization. I built this project purely for 
                <strong> educational and practice purposes</strong>. The main goals were:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">🕷️ Data & API Usage</h3>
                  <p className="text-blue-800 text-sm">Explore real-world data scraping and API integration</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">🧩 Component Design</h3>
                  <p className="text-green-800 text-sm">Practice routing, dynamic UI rendering, and component architecture</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">📱💻 Responsive Design</h3>
                  <p className="text-purple-800 text-sm">Experiment with responsive and clean UI/UX patterns</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-2">🏗️ Full-Stack Challenge</h3>
                  <p className="text-orange-800 text-sm">Build something from scratch as a learning challenge</p>
                </div>
              </div>
            </div>
          </section>

          {/* Content Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 About the Content</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Any data, media, or design inspiration used in this project is solely for <strong>demonstration and learning</strong>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  I <strong>do not claim any ownership</strong> over external assets, nor is the content used commercially
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  All third-party references belong to their <strong>respective owners</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* No Affiliation Notice */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚫 No Affiliation Notice</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 leading-relaxed">
                This site is <strong>not affiliated with, endorsed by, or officially connected to any company or organization</strong>. 
                It is a <strong>fan-made or personal demo</strong> and a <strong>portfolio piece</strong> meant to showcase my skills 
                in web development and the MERN stack.
              </p>
            </div>
          </section>

          {/* Call to Developers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🧠 Calling Developers, Learners & Recruiters!</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">If you're into:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">✨</span>
                  <span>Learning MERN stack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">🧪</span>
                  <span>Working with real-time data & APIs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">📦</span>
                  <span>Exploring frontend/backend architecture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600">🤝</span>
                  <span>Collaborating on open-source projects</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">📬 Let's Connect!</h3>
                <p className="text-gray-700 text-sm">
                  Check out more on my GitHub or message me on LinkedIn. Always up for feedback, 
                  collaboration, or just geeking out on tech!
                </p>
              </div>
            </div>
          </section>

          {/* Legal Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Legal Disclaimer</h2>
            <div className="prose prose-gray max-w-none">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>This project is for educational and portfolio purposes only</li>
                <li>No commercial use or profit is intended or derived from this project</li>
                <li>All external content, images, and references are used under fair use for educational purposes</li>
                <li>This website does not provide actual car rental services</li>
                <li>Any resemblance to existing businesses is purely coincidental</li>
              </ul>
            </div>
          </section>

          {/* Contact for Collaboration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🤝 Open for Collaboration</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                I'm always excited to connect with fellow developers, learn from experienced professionals, 
                and contribute to meaningful projects. Whether you're:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>A recruiter looking for passionate developers</li>
                <li>A fellow developer interested in collaboration</li>
                <li>Someone who wants to provide feedback or suggestions</li>
                <li>A mentor willing to share knowledge</li>
              </ul>
              <p className="text-gray-700">
                Feel free to reach out through any of the platforms mentioned above!
              </p>
            </div>
          </section>
        </div>

        {/* Final Note */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Thank You for Visiting!</h3>
          <p className="opacity-90">
            This project represents my journey in learning full-stack development. 
            I hope it demonstrates my passion for coding and continuous learning.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-lg">
            <span>Made with</span>
            <Heart className="h-5 w-5 text-red-300" />
            <span>and lots of</span>
            <Coffee className="h-5 w-5 text-yellow-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;