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

  // Close popups on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {

      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setOpenCalendar(false)
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(e.target as Node)
      ) {
        setOpenGuests(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

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

  return (

    <div className="relative z-[5000] bg-white rounded-[3rem] shadow-xl p-3 w-full max-w-6xl mx-auto overflow-visible flex items-center gap-2">

      <div className="flex flex-col md:flex-row gap-0 flex-1">{/* DESTINATION */}

        <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-4">

          <MapPin className="text-gray-600" />

          <input
            value={destination}
            onChange={handleDestinationChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            placeholder="City, Hotel or Location"
            className="bg-transparent outline-none w-full font-semibold"
          />

        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-[3000] bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
            {filteredSuggestions.map((loc, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

        {/* CHECK IN */}

        <div
          className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-4 cursor-pointer"
          onClick={() => {
            setOpenCalendar(true)
            setOpenGuests(false)
          }}
        >

          <Calendar className="text-gray-600" />

          <div>
            <div className="text-xs text-gray-400">Check-In</div>

            <div className="font-semibold">
              {startDate ? format(startDate, "dd MMM yyyy") : "Select"}
            </div>
          </div>

        </div>

        {/* CHECK OUT */}

        <div
          className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-4 cursor-pointer"
          onClick={() => {
            setOpenCalendar(true)
            setOpenGuests(false)
          }}
        >

          <Calendar className="text-gray-600" />

          <div>
            <div className="text-xs text-gray-400">Check-Out</div>

            <div className="font-semibold">
              {endDate ? format(endDate, "dd MMM yyyy") : "Select"}
            </div>
          </div>

        </div>

        {/* GUESTS */}

        <div
          ref={guestRef}
          className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-4 relative cursor-pointer"
          onClick={() => {            setTempRooms(rooms);
            setTempAdults(adults);
            setTempChildren(children);
            setOpenGuests(!openGuests);
            setOpenCalendar(false);
          }}
        >

          <Users className="text-gray-600" />

          <div>

            <div className="text-xs text-gray-400">
              Rooms & Guests
            </div>

            <div className="font-semibold">
              {rooms} Room · {adults} Adults · {children} Children
            </div>

          </div>

          {openGuests && (
            <> 
              <div className="fixed inset-0 z-[4000]" onClick={() => { setOpenCalendar(false); setOpenGuests(false); }} />
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
                  setOpenGuests(false); // close popup
                }}
              />
            </>
          )}

        </div>

      </div>

      {/* SEARCH */}

      <button
        onClick={handleSearch}
        className="flex items-center justify-center w-14 h-14 rounded-full 
  bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
  shadow-lg hover:shadow-xl hover:scale-105 transition flex-shrink-0"
      >
        <Search size={20} />
      </button>

      {/* CALENDAR */}

      {openCalendar && (
        <>
          <div className="fixed inset-0 z-[4000]" onClick={() => { setOpenCalendar(false); setOpenGuests(false); }} />
          <div
            ref={calendarRef}
            className="absolute left-0 right-0 top-full z-[6000] flex justify-center mt-2 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">

            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates as [Date | null, Date | null]
                setStartDate(start)
                setEndDate(end)

                if (start && end) setOpenCalendar(false)

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

    </div>

  )

}