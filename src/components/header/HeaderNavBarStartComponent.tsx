import logoImage from '@assets/roach_logo_discord.png';

function HeaderNavBarStartComponent() {
    return (
        <div className="flex items-center pr-2">
            <img src={logoImage} alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Roach</span>
        </div>
    );
}

export default HeaderNavBarStartComponent;