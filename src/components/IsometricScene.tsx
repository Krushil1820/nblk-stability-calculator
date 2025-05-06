import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

interface BuildingProps {
  x: number;
  y: number;
  height: number;
  color: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const Building: React.FC<BuildingProps> = ({ x, y, height, color, label, onClick, isActive }) => {
  const width = 60;
  const depth = 40;
  
  return (
    <motion.g
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      style={{ cursor: 'pointer' }}
    >
      {/* Building faces */}
      <polygon
        points={`${x},${y} ${x + width},${y} ${x + width},${y - height} ${x},${y - height}`}
        fill={color}
        stroke="#333"
        strokeWidth="2"
      />
      <polygon
        points={`${x + width},${y} ${x + width + depth},${y - depth} ${x + width + depth},${y - height - depth} ${x + width},${y - height}`}
        fill={color}
        stroke="#333"
        strokeWidth="2"
      />
      <polygon
        points={`${x},${y} ${x + width},${y} ${x + width + depth},${y - depth} ${x + depth},${y - depth}`}
        fill={color}
        stroke="#333"
        strokeWidth="2"
      />
      
      {/* Windows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <React.Fragment key={i}>
          <rect
            x={x + 15}
            y={y - height + 20 + i * 30}
            width="10"
            height="15"
            fill="#fff"
            stroke="#333"
            strokeWidth="1"
          />
          <rect
            x={x + 35}
            y={y - height + 20 + i * 30}
            width="10"
            height="15"
            fill="#fff"
            stroke="#333"
            strokeWidth="1"
          />
        </React.Fragment>
      ))}
      
      {/* Label */}
      <text
        x={x + width/2}
        y={y + 20}
        textAnchor="middle"
        fill="#333"
        fontSize="12"
      >
        {label}
      </text>
      
      {/* Highlight when active */}
      {isActive && (
        <motion.rect
          x={x - 5}
          y={y - height - 5}
          width={width + depth + 10}
          height={height + depth + 10}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.g>
  );
};

const IsometricScene: React.FC = () => {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);
  
  const buildings = [
    { id: 'economy', label: 'Economy', color: '#FFC107', x: 100, y: 300, height: 120 },
    { id: 'security', label: 'Security', color: '#2196F3', x: 200, y: 300, height: 150 },
    { id: 'governance', label: 'Governance', color: '#4CAF50', x: 300, y: 300, height: 180 },
    { id: 'social', label: 'Social', color: '#9C27B0', x: 400, y: 300, height: 100 },
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        {/* Ground */}
        <polygon
          points="0,300 600,300 600,400 0,400"
          fill="#E0E0E0"
        />
        
        {/* Buildings */}
        {buildings.map((building) => (
          <Building
            key={building.id}
            {...building}
            onClick={() => setActiveBuilding(building.id)}
            isActive={activeBuilding === building.id}
          />
        ))}
        
        {/* Roads */}
        <polygon
          points="0,300 600,300 600,320 0,320"
          fill="#757575"
        />
        <polygon
          points="0,300 600,300 550,250 50,250"
          fill="#9E9E9E"
        />
      </svg>
      
      {/* Info Panel */}
      {activeBuilding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {buildings.find(b => b.id === activeBuilding)?.label} Stability
          </Typography>
          <Typography variant="body2" paragraph>
            Click on each building to learn more about different aspects of political stability.
            The height of each building represents its relative importance in the stability calculation.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveBuilding(null)}
          >
            Close
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default IsometricScene; 