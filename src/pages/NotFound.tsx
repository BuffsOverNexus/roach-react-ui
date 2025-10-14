import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Button 
        label="Go Home" 
        onClick={() => navigate('/')}
        icon="pi pi-home"
      />
    </div>
  );
}