"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus } from "lucide-react"

// Define the dimension names
type DimensionName = "Autonomy" | "Environmental Mastery" | "Personal Growth" | "Positive Relations" | "Purpose in Life" | "Self-Acceptance";

// Interface for question data
interface QuestionData {
  id: number;
  text: string;
  score: number;
  recommendation: string;
}

// Interface for dimension data
interface DimensionData {
  name: DimensionName;
  description: string;
  score: number;
  questions: QuestionData[];
}

// Sample data for the dimensions
const dimensionsData: DimensionData[] = [
  {
    name: "Autonomy",
    description: "Independence and self-determination in making decisions and regulating behavior.",
    score: 72,
    questions: [
      { id: 1, text: "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people.", score: 3, recommendation: "You may benefit from environments that encourage open dialogue and assertiveness training." },
      { id: 8, text: "My decisions are not usually influenced by what everyone else is doing.", score: 4, recommendation: "Your independence in decision-making is a strength. Continue to trust your judgment while remaining open to constructive input." },
      { id: 15, text: "I tend to be influenced by people with strong opinions.", score: 2, recommendation: "Consider developing strategies to maintain your perspective when faced with strong opposing views." },
      { id: 22, text: "I have confidence in my opinions, even if they are contrary to the general consensus.", score: 3, recommendation: "Building more confidence in your unique viewpoint could enhance your sense of autonomy." },
      { id: 29, text: "It's difficult for me to voice my own opinions on controversial matters.", score: 3, recommendation: "Practice expressing your views in low-pressure situations to build confidence." },
      { id: 36, text: "I often change my mind about decisions if my friends or family disagree.", score: 4, recommendation: "Your ability to maintain your decisions despite disagreement is good; continue to balance this with openness to feedback." },
      { id: 43, text: "I judge myself by what I think is important, not by what others think is important.", score: 5, recommendation: "Your strong internal value system is a significant strength. Continue to use it as your primary guide." }
    ]
  },
  {
    name: "Environmental Mastery",
    description: "Ability to manage one's life and surrounding world effectively.",
    score: 65,
    questions: [
      { id: 2, text: "In general, I feel I am in charge of the situation in which I live.", score: 4, recommendation: "You generally feel in control of your environment, which is positive. Look for areas where you might enhance this further." },
      { id: 9, text: "The demands of everyday life often get me down.", score: 3, recommendation: "Consider developing additional stress management techniques to handle daily demands more effectively." },
      { id: 16, text: "I do not fit very well with the people and the community around me.", score: 4, recommendation: "Your sense of community fit is good. Continue to build connections that reinforce this feeling." },
      { id: 23, text: "I am quite good at managing the many responsibilities of my daily life.", score: 3, recommendation: "Your organizational skills are adequate. Consider exploring new systems or tools to enhance your efficiency." },
      { id: 30, text: "I often feel overwhelmed by my responsibilities.", score: 2, recommendation: "Developing prioritization skills and setting boundaries could help reduce feelings of being overwhelmed." },
      { id: 37, text: "I have difficulty arranging my life in a way that is satisfying to me.", score: 3, recommendation: "Consider reflecting on your core values to ensure your daily activities align with what truly matters to you." },
      { id: 44, text: "I have been able to build a home and a lifestyle for myself that is much to my liking.", score: 4, recommendation: "Your ability to create a satisfying living environment is a strength. Continue to refine it as your needs evolve." }
    ]
  },
  {
    name: "Personal Growth",
    description: "Feeling of continued development and realization of one's potential.",
    score: 78,
    questions: [
      { id: 3, text: "I think it is important to have new experiences that challenge how you think about yourself and the world.", score: 5, recommendation: "Your openness to growth-promoting experiences is excellent. Continue seeking diverse learning opportunities." },
      { id: 10, text: "For me, life has been a continuous process of learning, changing, and growth.", score: 4, recommendation: "You embrace lifelong learning well. Consider setting specific growth goals to further enhance this quality." },
      { id: 17, text: "I gave up trying to make big improvements or changes in my life a long time ago.", score: 1, recommendation: "Reconnecting with your aspirations and setting achievable goals could reignite your sense of growth potential." },
      { id: 24, text: "I feel like I have developed a lot as a person over time.", score: 4, recommendation: "Your self-perception of growth is positive. Reflect on your journey to identify patterns that facilitated this development." },
      { id: 31, text: "I do not enjoy being in new situations that require me to change my old familiar ways of doing things.", score: 2, recommendation: "Gradually exposing yourself to new situations might help increase your comfort with change." },
      { id: 38, text: "I have the sense that I have developed a lot as a person over time.", score: 5, recommendation: "Your strong sense of personal development is excellent. Consider mentoring others who are on their growth journey." },
      { id: 45, text: "When I think about it, I haven't really improved much as a person over the years.", score: 1, recommendation: "Try keeping a growth journal to document small improvements and changes you've made over time." }
    ]
  },
  {
    name: "Positive Relations",
    description: "Having warm, satisfying, trusting relationships with others.",
    score: 70,
    questions: [
      { id: 4, text: "Most people see me as loving and affectionate.", score: 4, recommendation: "Your ability to express warmth is a strength. Continue nurturing this quality in your relationships." },
      { id: 11, text: "Maintaining close relationships has been difficult and frustrating for me.", score: 3, recommendation: "Consider exploring communication techniques that might help overcome challenges in close relationships." },
      { id: 18, text: "I enjoy personal and mutual conversations with family members or friends.", score: 5, recommendation: "Your enjoyment of meaningful conversations is excellent. Continue prioritizing these interactions in your relationships." },
      { id: 25, text: "I don't have many people who want to listen when I need to talk.", score: 2, recommendation: "Building a wider support network might help ensure you have people available when you need to talk." },
      { id: 32, text: "I know that I can trust my friends, and they know they can trust me.", score: 4, recommendation: "Your foundation of trust in friendships is strong. Continue cultivating this through consistency and honesty." },
      { id: 39, text: "People would describe me as a giving person, willing to share my time with others.", score: 4, recommendation: "Your generosity with time is appreciated by others. Ensure you're also maintaining healthy boundaries." },
      { id: 46, text: "I have not experienced many warm and trusting relationships with others.", score: 2, recommendation: "Consider what qualities you value in relationships and actively seek connections with people who share these values." }
    ]
  },
  {
    name: "Purpose in Life",
    description: "Having goals and a sense of direction in life.",
    score: 68,
    questions: [
      { id: 5, text: "I live life one day at a time and don't really think about the future.", score: 3, recommendation: "While living in the present is valuable, developing some future goals might enhance your sense of direction." },
      { id: 12, text: "I have a sense of direction and purpose in life.", score: 4, recommendation: "Your sense of purpose is good. Consider periodically revisiting and refining your life goals to maintain this clarity." },
      { id: 19, text: "My daily activities often seem trivial and unimportant to me.", score: 3, recommendation: "Try connecting your daily tasks to your larger values and goals to increase their perceived meaning." },
      { id: 26, text: "I enjoy making plans for the future and working to make them a reality.", score: 4, recommendation: "Your forward-thinking approach is positive. Continue developing both short and long-term planning skills." },
      { id: 33, text: "Some people wander aimlessly through life, but I am not one of them.", score: 4, recommendation: "Your sense of direction is a strength. Consider sharing your approach with others who might benefit from it." },
      { id: 40, text: "I sometimes feel as if I've done all there is to do in life.", score: 2, recommendation: "Exploring new interests or revisiting abandoned passions might reinvigorate your sense of possibility." },
      { id: 47, text: "My aims in life have been more a source of satisfaction than frustration to me.", score: 3, recommendation: "Consider evaluating which goals have been most satisfying and why, to guide future goal-setting." }
    ]
  },
  {
    name: "Self-Acceptance",
    description: "Positive attitude toward oneself and one's past life.",
    score: 62,
    questions: [
      { id: 6, text: "When I look at the story of my life, I am pleased with how things have turned out.", score: 3, recommendation: "Reflecting on specific positive outcomes in your life journey might enhance your overall satisfaction." },
      { id: 13, text: "In general, I feel confident and positive about myself.", score: 4, recommendation: "Your self-confidence is good. Continue building on this through acknowledging your achievements." },
      { id: 20, text: "I like most aspects of my personality.", score: 3, recommendation: "Consider exploring your character strengths more deeply to increase appreciation of your unique qualities." },
      { id: 27, text: "I feel like many of the people I know have gotten more out of life than I have.", score: 3, recommendation: "Remember that social comparisons often don't reflect reality. Focus on your personal growth journey." },
      { id: 34, text: "My attitude about myself is probably not as positive as most people feel about themselves.", score: 2, recommendation: "Practicing positive self-talk and challenging negative self-perceptions could improve your self-image." },
      { id: 41, text: "When I compare myself to friends and acquaintances, it makes me feel good about who I am.", score: 3, recommendation: "While social comparison can sometimes boost confidence, developing internal validation skills is more sustainable." },
      { id: 48, text: "The past had its ups and downs, but in general, I wouldn't want to change it.", score: 4, recommendation: "Your acceptance of your past is healthy. Continue drawing lessons from both positive and challenging experiences." }
    ]
  }
];

// Function to determine color based on score
const getScoreColor = (score: number) => {
  if (score < 50) return "text-destructive"
  if (score < 70) return "text-yellow-600"
  return "text-green-600"
}

// Function to determine background color based on score
const getBackgroundColor = (score: number) => {
  if (score < 50) return "bg-red-50"
  if (score < 70) return "bg-yellow-50"
  return "bg-green-50"
}

// Function to get response color
const getResponseColor = (score: number) => {
  if (score <= 2) return "bg-red-100"
  if (score <= 4) return "bg-yellow-100"
  return "bg-green-100"
}

// Function to get response text
const getResponseText = (score: number) => {
  switch (score) {
    case 1: return "Strongly Disagree"
    case 2: return "Disagree"
    case 3: return "A little agree"
    case 4: return "Agree"
    case 5: return "Strongly Agree"
    default: return "Unknown"
  }
}

export function DimensionAnalysis() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDetails = (dimension: DimensionData) => {
    setSelectedDimension(dimension)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dimensionsData.map((dimension) => (
          <Card key={dimension.name} className={`${getBackgroundColor(dimension.score)} border-l-4 ${dimension.score < 50 ? 'border-l-red-500' : dimension.score < 70 ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{dimension.name}</CardTitle>
                <Badge className={getScoreColor(dimension.score)}>Score: {dimension.score}</Badge>
              </div>
              <CardDescription>{dimension.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${dimension.score < 50 ? 'bg-red-500' : dimension.score < 70 ? 'bg-yellow-500' : 'bg-green-500'} rounded-full`} 
                    style={{ width: `${dimension.score}%` }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-1"
                  onClick={() => handleOpenDetails(dimension)}
                >
                  <Plus className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Dimension Analysis Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {selectedDimension?.name} Analysis
              <Badge className={selectedDimension ? getScoreColor(selectedDimension.score) : ""}>
                Score: {selectedDimension?.score}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {selectedDimension?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold">Questions & Responses</h3>
            
            <div className="space-y-6">
              {selectedDimension?.questions.map((question) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Q{question.id}: {question.text}</h4>
                      <Badge className={getResponseColor(question.score)}>
                        {getResponseText(question.score)}
                      </Badge>
                    </div>
                    
                    {/* Response Visualization */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Strongly Disagree</span>
                        <span>Strongly Agree</span>
                      </div>
                      <div className="flex w-full h-6 bg-gray-100 rounded-lg">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div 
                            key={value} 
                            className={`flex-1 ${value === question.score ? (
                              value <= 2 ? 'bg-red-300' : 
                              value <= 4 ? 'bg-yellow-300' : 
                              'bg-green-300'
                            ) : 'bg-transparent'} ${value === 1 ? 'rounded-l-lg' : value === 5 ? 'rounded-r-lg' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* AI Recommendation */}
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <h5 className="text-sm font-medium text-blue-800 mb-1">AI Recommendation</h5>
                          <p className="text-sm text-blue-700">{question.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 