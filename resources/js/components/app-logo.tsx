import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center space-x-3">
  
            <div className="flex items-center justify-center h-10 w-10 rounded bg-transparent">
                <AppLogoIcon className="h-6 w-6 text-primary fill-current" />
            </div>

            <div className="h-8 border-l border-gray-600" />

            <div className="pl-3 text-xs leading-tight">
                <p className="font-semibold text-gray-800">SISTEM MANAJEMEN</p>
                PEMINJAMAN RUANGAN
            </div>
        </div>
    );
}
