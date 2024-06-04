//note: commented out ones exist, but i couldn't check them at the time cause they were empty

export interface UserData {
    achievements: Achievement[],
    active?: boolean,
    alumni?: boolean,
    alumnized_at: null | string,
    anonymize_date: string,
    correction_point: number,
    created_at: string,
    cursus_users: CursusUser[],
    data_erasure_date: string,
    displayname: string,
    email: string,
    // expertises_users: [],
    first_name: string,
    // groups: [],
    id: number,
    image: UserImageData,
    kind: string,
    languages_users: LanguageUser[],
    last_name: string,
    location: null, //no clue
    login: string,
    // partnerships: [],
    // patroned: [],
    // patroning: [],
    phone: string,
    pool_month: string,
    pool_year: number,
    projects_users: ProjectUser[],
    // roles: [],
    staff?: boolean, 
    titles: UserTitle[],
    titles_users: TitleUser[],
    updated_at: string,
    url: string,
    usual_first_name: string | null,
    usual_full_name: string,
    wallet: number
}


interface Achievement {
    description: string,
    id: number,
    image: string,
    kind: string,
    name: string,
    nbr_of_success: null | number,
    tier: string,
    users_url: string,
    visible: boolean,
    campus: Campus[],
    campus_users: CampusUser[],

}

interface Campus {
    active: boolean,
    address: string,
    city: string,
    country: string,
    default_hidden_phone: boolean,
    email_extension: string,
    facebook: string,
    id: number,
    name: string,
    public: boolean,
    time_zone: string,
    twitter: string,
    users_count: number,
    vogsphere_id: number,
    website: string,
    zip: number,
}

interface CampusUser {
    campus_id: number,
    created_at: string,
    id: number,
    is_primary: boolean,
    updated_at: string,
    user_id: number
}

interface CursusUser {
    begin_at: string,
    blackholed_at: null,
    created_at: string,
    cursus_id: number,
    end_at: string,
    grade: null | string,
    has_coalition: boolean,
    id: number,
    level: number,
    updated_at: string,
}

interface UserImageData {
    link: string,
    versions: UserImageVersions,
}

interface UserImageVersions {
    large: string,
    medium: string,
    micro: string,
    small: string
  }

interface LanguageUser {
    created_at: string,
    id: number,
    language_id: number,
    position: number,
    user_id: number
}

interface ProjectUser {
    created_at: string,
      current_team_id: number,
      final_mark: null | number,
      id: number,
      marked: boolean,
      marked_at: null | string,
      occurrence: number,
      retriable_at: null,
      status: string,
      updated_at: string,
      validated?: null | boolean
}

interface UserTitle {
    id: number,
    name: string, //note variables are denoted by %
}

interface TitleUser {
    created_at: string,
    id: number,
    selected: boolean,
    title_id: number,
    updated_at: string,
    user_id: number
}