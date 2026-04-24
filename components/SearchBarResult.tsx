'use client'

import { useState, useEffect, useRef } from "react"
import { MapPin, Calendar, Users, Search } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import { useRouter } from 'next/navigation'
import GuestSelector from "./GuestSelector"

interface Props {
  onSearch?: (data: any) => void
  initialDestination?: string
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialRooms?: number
  initialAdults?: number
  initialChildren?: number
}

const dummyLocations = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Dubai', 'Singapore'];

export default function SearchBar({ onSearch, initialDestination = "", initialStartDate = null, initialEndDate = null, initialRooms = 1, initialAdults = 2, initialChildren = 0 }: Props) {

  const router = useRouter();

  const [destination, setDestination] = useState(initialDestination)
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate || new Date())
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)

  const [openCalendar, setOpenCalendar] = useState(false)
  const [openGuests, setOpenGuests] = useState(false)

  const [rooms, setRooms] = useState(initialRooms)
  const [adults, setAdults] = useState(initialAdults)
  const [children, setChildren] = useState(initialChildren)

  const [tempRooms, setTempRooms] = useState(rooms);
const [tempAdults, setTempAdults] = useState(adults);
const [tempChildren, setTempChildren] = useState(children);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const calendarRef = useRef<HTMLDivElement>(null)
  const guestRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)

  // Close popups on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        setOpenCalendar(false)
        setOpenGuests(false)
      }
    }

    if (openCalendar || openGuests) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [openCalendar, openGuests])

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    if (value) {
      const filtered = dummyLocations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('destination', destination);
    if (startDate) params.set('startDate', startDate.toISOString());
    if (endDate) params.set('endDate', endDate.toISOString());
    params.set('rooms', rooms.toString());
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    router.push('/search?' + params.toString());
    if (onSearch) {
      onSearch({
        destination,
        startDate,
        endDate,
        rooms,
        adults,
        children
      });
    }
  }

  // Auto-search when any filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500); // Debounce for 500ms to avoid too many searches
    return () => clearTimeout(timer);
  }, [destination, startDate, endDate, rooms, adults, children])

  return (

    <div ref={searchBarRef} className="relative z-[5000] bg-white rounded-3xl shadow-lg p-4 w-full overflow-visible">
      <div className="flex items-center gap-4">

      {/* DESTINATION */}
      <div className="relative flex-1 flex items-center gap-3 border-l-2 border-slate-200 pl-4">
        <MapPin className="text-slate-600 w-5 h-5 flex-shrink-0" />
        <div className="w-full">
          <input
            value={destination}
            onChange={handleDestinationChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            placeholder="Where to?"
            className="bg-transparent outline-none w-full font-semibold text-sm text-slate-900 placeholder-slate-400"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-[3000] bg-white border border-slate-300 rounded-lg shadow-lg mt-2 max-h-48 overflow-y-auto">
              {filteredSuggestions.map((loc, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-slate-100 cursor-pointer text-sm font-medium text-slate-700"
                  onMouseDown={() => {
                    setDestination(loc);
                    setShowSuggestions(false);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CHECK IN */}
      <div
        className="flex items-center gap-3 border-l-2 border-slate-200 pl-4 cursor-pointer hover:bg-slate-50/50 px-2 py-1 rounded-lg transition"
        onClick={() => {
          setOpenCalendar(true)
          setOpenGuests(false)
        }}
      >
        <Calendar className="text-slate-600 w-5 h-5 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Check-In</div>
          <div className="font-bold text-slate-900 text-sm">
            {startDate ? format(startDate, "dd MMM yyyy") : "Select"}
          </div>
        </div>
      </div>

      {/* CHECK OUT */}
      <div
        className="flex items-center gap-3 border-l-2 border-slate-200 pl-4 cursor-pointer hover:bg-slate-50/50 px-2 py-1 rounded-lg transition"
        onClick={() => {
          setOpenCalendar(true)
          setOpenGuests(false)
        }}
      >
        <Calendar className="text-slate-600 w-5 h-5 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Check-Out</div>
          <div className="font-bold text-slate-900 text-sm">
            {endDate ? format(endDate, "dd MMM yyyy") : "Select"}
          </div>
        </div>
      </div>

      {/* GUESTS */}
      <div
        ref={guestRef}
        className="flex items-center gap-3 border-l-2 border-slate-200 pl-4 cursor-pointer hover:bg-slate-50/50 px-2 py-1 rounded-lg transition"
        onClick={() => {
          setTempRooms(rooms);
          setTempAdults(adults);
          setTempChildren(children);
          setOpenGuests(!openGuests);
          setOpenCalendar(false);
        }}
      >
        <Users className="text-slate-600 w-5 h-5 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Guests</div>
          <div className="font-bold text-slate-900 text-sm">
            {rooms} room, {adults + children} guests
          </div>
        </div>
      </div>
      </div>

      {/* CALENDAR POPUP */}
      {openCalendar && (
        <>
          <div className="fixed inset-0 z-[4000]" onClick={() => { setOpenCalendar(false); }} />
          <div
            ref={calendarRef}
            className="absolute left-1/2 -translate-x-1/2 top-full z-[6000] mt-4 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-200">
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates as [Date | null, Date | null]
                  setStartDate(start)
                  setEndDate(end)
                  if (start && end) {
                    setTimeout(() => setOpenCalendar(false), 300)
                  }
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={2}
                minDate={new Date()}
              />
            </div>
          </div>
        </>      
      )}

      {/* GUEST SELECTOR POPUP */}
      {openGuests && (
        <>
          <div className="fixed inset-0 z-[4000]" onClick={() => { setOpenGuests(false); }} />
          <div
            ref={guestRef}
            className="absolute right-0 top-full z-[6000] mt-4 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <GuestSelector
              rooms={tempRooms}
              adults={tempAdults}
              children={tempChildren}
              setRooms={setTempRooms}
              setAdults={setTempAdults}
              setChildren={setTempChildren}
              onApply={() => {
                setRooms(tempRooms);
                setAdults(tempAdults);
                setChildren(tempChildren);
                setOpenGuests(false);
              }}
            />
          </div>
        </>
      )}

    </div>

  )

}