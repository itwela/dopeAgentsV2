import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { CustomerType } from "../interfaces/agentChatInterfaces";



export function CustomerTypeSelection({ onSelect, onCancel }: {
    onSelect: (type: CustomerType) => void;
    onCancel?: () => void;
  }) {
    const customerTypes = [
      {
        id: 'current-dope' as CustomerType,
        title: 'Current DOPE Customer',
        description: 'Existing client with active campaigns',
        icon: '🎯',
        gradient: { from: '#EB1416', to: '#FF6B6B' }
      },
      {
        id: 'print-customer' as CustomerType,
        title: 'Print Customer',
        description: 'Client with print-only services',
        icon: '🖨️',
        gradient: { from: '#FF6B6B', to: '#FFB3B3' }
      },
      {
        id: 'new-prospect' as CustomerType,
        title: 'New Prospect',
        description: 'Brand new potential client',
        icon: '✨',
        gradient: { from: '#FFB3B3', to: '#FFD6D6' }
      }
    ];
  
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Select Customer Type</h3>
          <p className="text-sm text-muted-foreground">Choose the category that best describes this customer</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {customerTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className=""
            >
              <MagicCard
                className="cursor-pointer rounded-lg group h-full"
                gradientSize={200}
                gradientColor="#FF4B4B"
                gradientOpacity={0.1}
                gradientFrom={type.gradient.from}
                gradientTo={type.gradient.to}
              >
                <button
                  onClick={() => onSelect(type.id)}
                  className="relative w-full min-h-[200px] h-full p-6 text-left transition-all duration-300 hover:scale-[1.02]"
                >
                  <ShineBorder
                    borderWidth={2}
                    duration={8}
                    shineColor={[type.gradient.from, type.gradient.to]}
                    className="rounded-lg"
                  />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                      {type.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </button>
              </MagicCard>
            </motion.div>
          ))}
        </div>
        
        {onCancel && (
          <div className="flex justify-center mt-4">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
      </motion.div>
    );
}